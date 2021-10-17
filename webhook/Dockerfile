FROM golang:1.17.2-bullseye

RUN apt-get update
RUN apt-get install -y nodejs=12.22.5~dfsg-2~11u1 npm=7.5.2+ds-2
RUN npm install -g nuxt

WORKDIR /opt/application/nuxtSource

RUN mkdir -p /opt/application/webhook
WORKDIR /opt/application/webhook
COPY ./webhook.go /opt/application/webhook/
COPY ./build.sh /opt/application/webhook/
RUN go install webhook.go

ENTRYPOINT ["webhook"]
