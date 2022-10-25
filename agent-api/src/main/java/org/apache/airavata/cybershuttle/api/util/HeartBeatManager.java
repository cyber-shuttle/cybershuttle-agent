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

package org.apache.airavata.cybershuttle.api.util;

import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;

import java.nio.charset.StandardCharsets;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class HeartBeatManager implements InitializingBean {
    private static final Logger logger = LoggerFactory.getLogger(HeartBeatManager.class);

    @org.springframework.beans.factory.annotation.Value("${cybershuttle.public.api.url}")
    private String cybershuttleApiUrl;

    @org.springframework.beans.factory.annotation.Value("${agent.api.url}")
    private String agentApiUrl;

    @org.springframework.beans.factory.annotation.Value("${agent.name}")
    private String agentName;

    private String agentId = null;

    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

    @Override
    public void afterPropertiesSet() throws Exception {
        scheduler.scheduleWithFixedDelay(() -> {

            try {
                if (agentId == null) {
                    CloseableHttpClient client = HttpClients.createDefault();
                    HttpPost httpPost = new HttpPost(cybershuttleApiUrl + "/api/agent/register");

                    String json = "{\n" +
                            "    \"agentApiUrl\": \"" + agentApiUrl + "\",\n" +
                            "    \"agentName\": \"" + agentName + "\",\n" +
                            "    \"cpus\": " + 2 + ",\n" +
                            "    \"gpuMemory\": " + 3000 + ",\n" +
                            "    \"memory\": " + 5000 + "\n" +
                            "}";

                    StringEntity entity = new StringEntity(json);
                    httpPost.setEntity(entity);
                    httpPost.setHeader("Accept", "application/json");
                    httpPost.setHeader("Content-type", "application/json");

                    CloseableHttpResponse response = client.execute(httpPost);
                    int statusCode = response.getStatusLine().getStatusCode();

                    if (statusCode == 200) {
                        HttpEntity httpResponseEntity = response.getEntity();
                        Header encodingHeader = httpResponseEntity.getContentEncoding();

                        String jsonOut = EntityUtils.toString(httpResponseEntity, StandardCharsets.UTF_8);

                        JSONObject jsonObject = new JSONObject(jsonOut);
                        agentId = jsonObject.getString("agentId");
                        logger.info("Registered agent id {}", agentId);
                    } else {
                        logger.error("Failed to register agent on CyberShuttle. Error code " + statusCode);
                    }

                } else {
                    CloseableHttpClient client = HttpClients.createDefault();
                    HttpPost httpPost = new HttpPost(cybershuttleApiUrl + "/api/agent/ping");

                    String json = "{\n" +
                            "    \"agentId\": \"" + agentId + "\",\n" +
                            "    \"memoryRemaining\": " + 3000 + ",\n" +
                            "    \"gpuMemoryRemaining\": " + 1000 + ",\n" +
                            "    \"cpuLoad\": " + 0.2 + "\n" +
                            "}";

                    StringEntity entity = new StringEntity(json);
                    httpPost.setEntity(entity);
                    httpPost.setHeader("Accept", "application/json");
                    httpPost.setHeader("Content-type", "application/json");

                    CloseableHttpResponse response = client.execute(httpPost);
                    int statusCode = response.getStatusLine().getStatusCode();

                    if (statusCode == 200) {
                        HttpEntity httpResponseEntity = response.getEntity();
                        Header encodingHeader = httpResponseEntity.getContentEncoding();

                        String jsonOut = EntityUtils.toString(httpResponseEntity, StandardCharsets.UTF_8);

                        JSONObject jsonObject = new JSONObject(jsonOut);
                        String status = jsonObject.getString("status");
                        switch (status){
                            case "Updated":
                                logger.info("Agent {} successfully updated the heartbeat", agentId);
                                break;
                            case "Notregistered":
                                logger.info("Agent {} was not registered", agentId);
                                agentId = null;
                        }
                    } else {
                        logger.error("Failed to register agent on CyberShuttle. Error code " + statusCode);
                    }
                }
            } catch (Exception e) {
                logger.error("Failed while running heartbeat. Retrying...", e);
            }
        }, 1, 10, TimeUnit.SECONDS);

    }
}
