/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.apache.airavata.cybershuttle.api.handlers;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.command.CreateContainerResponse;
import com.github.dockerjava.api.model.*;
import com.github.dockerjava.core.DefaultDockerClientConfig;
import com.github.dockerjava.core.DockerClientBuilder;
import org.apache.airavata.cybershuttle.api.model.UILaunchRequest;
import org.apache.airavata.cybershuttle.api.model.UILaunchResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.util.Pair;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.function.Consumer;

@RestController
@RequestMapping(path = "/ui")
public class UIOperationHandler {

    private final Map<String, Process> noVncProcesses = new ConcurrentHashMap<>();

    @org.springframework.beans.factory.annotation.Value("${port.bind.range}")
    private String portRange;

    @org.springframework.beans.factory.annotation.Value("${cybershuttle.api.url}")
    private String cybershuttleApiUrl;

    @org.springframework.beans.factory.annotation.Value("${vnc.bin.home}")
    private String vncHomeDir;

    @org.springframework.beans.factory.annotation.Value("${vnc.bin.name}")
    private String vncBin;

    @org.springframework.beans.factory.annotation.Value("${vnc.bind.host}")
    private String vncBindHost;

    private static final Logger logger = LoggerFactory.getLogger(UIOperationHandler.class);

    @PostMapping(path = "/launch", consumes = "application/json", produces = "application/json")
    public UILaunchResponse launchUIApp(@RequestBody UILaunchRequest launchRequest) throws Exception {
        Pair<String, Integer> launchResp = runUIContainer(launchRequest);
        String noVncUrl = startNoVNC(launchResp.getFirst(), launchResp.getSecond(), launchRequest);

        return UILaunchResponse.UILaunchResponseBuilder.newInstance()
                .withContainerId(launchResp.getFirst())
                .withExecutionId(launchRequest.getExecutionId())
                .withVncUrl(noVncUrl).build();
    }

    @GetMapping(path = "/killNoVnc/{containerId}")
    public String killNoVnc(@PathVariable String containerId) {
        killNoVncSession(containerId);
        return "Success";
    }

    @GetMapping(path = "/container/status/{containerId}")
    public Map<String, String> getUiContainerStatus(@PathVariable String containerId) {
        String uiContainerStatus = checkUIContainerStatus(containerId);
        return Collections.singletonMap("status", uiContainerStatus);
    }

    private Pair<String, Integer> runUIContainer(UILaunchRequest launchRequest) throws Exception {

        DefaultDockerClientConfig.Builder config = DefaultDockerClientConfig.createDefaultConfigBuilder();
        DockerClient dockerClient = DockerClientBuilder.getInstance(config.build()).build();

        // TODO pull image

        String containerId = UUID.randomUUID().toString();
        int mappingPort = getAvailablePort(portRange);

        logger.info("Using mapping port {} for execution Id {}", mappingPort, launchRequest.getExecutionId());

        HostConfig hostConfig = HostConfig.newHostConfig()
                .withPortBindings(PortBinding.parse(mappingPort + ":" + launchRequest.getInternalVncPort()))
                .withCapAdd(Capability.SYS_PTRACE);

        if (launchRequest.getArchiveId() != null) {
            // TODO download archive and mount path
            // hostConfig.withBinds(Bind.parse(archiveOp.get().getPath() + ":" + containerInputPath));
        }

        CreateContainerResponse containerResponse = dockerClient
                .createContainerCmd(launchRequest.getDockerImageName()).withName(containerId)
                .withTty(true)
                .withAttachStdin(true)
                .withEnv("CYBERSHUTTLE_API_URL="+cybershuttleApiUrl, "EXECUTION_ID=" + launchRequest.getExecutionId())
                .withHostConfig(hostConfig)
                .withAttachStdout(true)
                .exec();

        logger.info("Created the UI container with id " + containerResponse.getId());

        if (containerResponse.getWarnings() != null && containerResponse.getWarnings().length > 0) {
            StringBuilder warningStr = new StringBuilder();
            for (String w : containerResponse.getWarnings()) {
                warningStr.append(w).append(",");
            }
            logger.warn("UI Container " + containerResponse.getId() + " warnings : " + warningStr);
            throw new Exception("Failed to start the UI container");
        } else {
            logger.info("Starting UI container with id {} and mapped port {} for execution id {}",
                    containerResponse.getId(), mappingPort, launchRequest.getExecutionId());
            dockerClient.startContainerCmd(containerResponse.getId()).exec();
            return Pair.of(containerResponse.getId(), mappingPort);
        }
    }

    private class VncProcessReader implements Runnable {

        private InputStream inputStream;
        private Consumer<String> consumer;

        public VncProcessReader(InputStream inputStream, Consumer<String> consumer) {
            this.inputStream = inputStream;
            this.consumer = consumer;
        }

        @Override
        public void run() {
            new BufferedReader(new InputStreamReader(inputStream)).lines()
                    .forEach(consumer);
        }
    }

    private String startNoVNC(String containerId, int containerPort, UILaunchRequest launchRequest) throws Exception {
        int noVNCPort = getAvailablePort(portRange, containerPort);

        Process noVncProcess = Runtime.getRuntime().exec("bash " + vncBin + " --vnc localhost:" +
                containerPort + " --listen " + noVNCPort, null, new File(vncHomeDir));

        VncProcessReader processReader =
                new VncProcessReader(noVncProcess.getInputStream(), System.out::println);
        Future<?> future = Executors.newSingleThreadExecutor().submit(processReader);

        noVncProcesses.put(containerId, noVncProcess);

        String noVNCUrl = "http://" + vncBindHost + ":" + noVNCPort + "/vnc.html?host="
                + vncBindHost+ "&port=" + noVNCPort + "&autoconnect=1&password=" + launchRequest.getVncPassword();

        logger.info("Using No VNC URL {} for launch id {}", noVNCUrl, launchRequest.getExecutionId());
        return noVNCUrl;
    }

    private int getAvailablePort(String portRange, int ... excludes) throws Exception {
        String[] parts = portRange.split(":");
        for (int port = Integer.parseInt(parts[0]); port <= Integer.parseInt(parts[1]); port++) {
            if (! isPortOpen(port)) {
                final int selectedPort = port;
                if (! Arrays.stream(excludes).filter(exlude -> exlude == selectedPort).findAny().isPresent()) {
                    return port;
                }
            }
        }
        throw new Exception("No open port available in range " + portRange);
    }

    private boolean isPortOpen(int port) {
        try {
            Socket socket = new Socket();
            socket.connect(new InetSocketAddress("localhost", port), 1000);
            socket.close();
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    public String checkUIContainerStatus(String containerId) {
        DefaultDockerClientConfig.Builder config = DefaultDockerClientConfig.createDefaultConfigBuilder();
        DockerClient dockerClient = DockerClientBuilder.getInstance(config.build()).build();
        List<Container> containers = dockerClient.listContainersCmd().withIdFilter(Collections.singletonList(containerId)).exec();
        if (containers.size() == 0) {
            killNoVncSession(containerId);
            return "STOPPED";
        } else {
            ContainerPort[] ports = containers.get(0).getPorts();
            ContainerPort vncBindPort = ports[0];
            if (isPortOpen(vncBindPort.getPublicPort())) {
                return "PORT_OPEN";
            } else {
                return "SETTING_UP";
            }
        }

    }

    public void killNoVncSession(String containerId) {
        if (noVncProcesses.containsKey(containerId)) {
            logger.info("Killing NoVnc process bind with container id " + containerId);
            Process process = noVncProcesses.get(containerId);
            process.destroy();
        }
    }
}
