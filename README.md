# CyberShuttle Agent 

This repository implements the Agent that is being installed in remote compute resources to gain access to CyberShuttle server. Agent helps the CyberShuttle server to following tasks on installed host

* Run remote user interfaces and route VNC sessions through the network
* Run remote python code fragments with previously captured session. https://dl.acm.org/doi/pdf/10.1145/3491418.3530296
* Transfer local outputs captured in executions into main CyberShuttle storage

### REST API Reference

#### Launch an UI App

```
POST http://localhost:8081/ui/launch
```
```
{
"executionId": "001",
"dockerImageName": "vmd",
"internalVncPort": 5900,
"vncPassword": "1234",
"archiveId": "sf34d",
"inputDir": "/opt/inputs"
}
```
#### Monitor UI Container status

```
http://localhost:8081/ui/container/status/<Container-Id>
```
