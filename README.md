# Final-project



## Task

Tạo 1 cụm K8s gồm những yêu cầu sau:

- Deploy 3  pod chạy dịch vụ Front-End (ReactJs,VueJs,Angular,...)
- Deploy 3  pod chạy dịch vụ Backt-End (C#,Java,Golang,Python,...)
- Image của FE và BE phải được build từ Dockerfile và push lên Dockerhub, không sử dụng image mặc định trên docker registry.
- Các pod sẽ được autoscale theo thông số CPU
- Deploy database (mysql,mongodb,...) (có thể triển khai theo mô hình HA (Dùng helm hoặc statefulset (sẽ được cộng điểm))) hoặc mô hình standalone
- Config Front-end gọi tới Back-end và Back-end gọi tới database
- Các setting liên quan đến credential để trong Secret.
- Dùng Daemonset triển khai elasticsearch (image fluentd-elasticsearch).
- Deploy ingress sao cho từ internet có thể gọi được vào dịch vụ chạy Front-End theo DNS.
- (Có thể configure HTTPS (điểm cộng)). Nếu không có domain name thì dùng service type Nodeport hoặc Loadbalancer (không được điểm tối đa).


## Result
- ToDoApp: Frontend-app use ReactJs, Backend-app use Nodejs, DB use MongoDB
- Daemonset: Create fluentd-elasticsearch on each node
- HPA: Horizontal Auto Scaler for FE and BE pod.
- MongoDB: statefulset for deploying mongodb with authentication.
- Nginx-ingress-controller: helm chart for deploying nginx-ingress.


**This is workloads**

![Alt text](/evidences/workloads.PNG)

**When I use kubectl port-forward, app worked normally**

![Alt text](/evidences/app_localhost_port-forward.PNG)

--MongoDB can write data--

![Alt text](/evidences/mongo_db.PNG)

**When I deploy NodePort for frontend service, it worked normally**

![Alt text](/evidences/app_NodePort.PNG)

![Alt text](/evidences/svc_with_NodePort.PNG)

**However, when I setup DNS and use ingress, it display 'Invalid Host Header' error (i use mobile phone to connect)**

![Alt text](/evidences/app_ingress.jpg)

![Alt text](/evidences/DNS_Godaddy.PNG)

![Alt text](/evidences/workloads.PNG)

-- I search for error on Internet and realize the reason is in front-end code with "proxy://....". I followed with guide adding **DANGEROUSLY_DISABLE_HOST_CHECK=true** into *.env.development.local*, but it still did not work --

https://stackoverflow.com/questions/71555227/invalid-host-header-when-i-visit-my-website-with-my-own-domain

https://github.com/gitpod-io/gitpod/issues/628

https://create-react-app.dev/docs/proxying-api-requests-in-development/


**Https**

![Alt text](/evidences/app_https.jpg)

![Alt text](/evidences/ingress_https.PNG)

![Alt text](/evidences/secret.PNG)
