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

package org.apache.airavata.cybershuttle.api.model;

public class UILaunchResponse {
    private String containerId;
    private String executionId;
    private String vncUrl;

    public String getContainerId() {
        return containerId;
    }

    public void setContainerId(String containerId) {
        this.containerId = containerId;
    }

    public String getExecutionId() {
        return executionId;
    }

    public void setExecutionId(String executionId) {
        this.executionId = executionId;
    }

    public String getVncUrl() {
        return vncUrl;
    }

    public void setVncUrl(String vncUrl) {
        this.vncUrl = vncUrl;
    }


    public static final class UILaunchResponseBuilder {
        private String containerId;
        private String executionId;
        private String vncUrl;

        private UILaunchResponseBuilder() {
        }

        public static UILaunchResponseBuilder newInstance() {
            return new UILaunchResponseBuilder();
        }

        public UILaunchResponseBuilder withContainerId(String containerId) {
            this.containerId = containerId;
            return this;
        }

        public UILaunchResponseBuilder withExecutionId(String executionId) {
            this.executionId = executionId;
            return this;
        }

        public UILaunchResponseBuilder withVncUrl(String vncUrl) {
            this.vncUrl = vncUrl;
            return this;
        }

        public UILaunchResponse build() {
            UILaunchResponse uILaunchResponse = new UILaunchResponse();
            uILaunchResponse.setContainerId(containerId);
            uILaunchResponse.setExecutionId(executionId);
            uILaunchResponse.setVncUrl(vncUrl);
            return uILaunchResponse;
        }
    }
}
