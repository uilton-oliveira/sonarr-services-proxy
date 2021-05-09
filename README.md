# Sonarr Services Proxy

Proxy Sonarr Services to create "Alternate Titles" for Animes, Series and Movies entries manually.  

This project will act as a proxy that will intercept requests to services.sonarr.tv and inject new entries to the response of the url: https://services.sonarr.tv/v1/scenemapping

You will need a Reverse Proxy like NGINX to map this to the url "services.sonarr.tv" on port 443 and change your hosts file to redirect services.sonarr.tv to localhost, or if your router allow it, change the dnsmasq settings to redirect it.

## Directories
This directory has been created in the image to be used for configuration and persistent storage (xem-mapping.json: custom mapping).
```
/sonarr-services-proxy/config
```

### sonarr-mapping.json
This file contains the custom mapping that will be merged with the original response  
```yaml
exclude:
# TVDB-ID
- '72241'
include:
- tvdbId: 321239
  title: O Conto da Aia
  searchTitle: O Conto da Aia
  season: -1
- tvdbId: 321239
  title: O Conto da Aia
  searchTitle: O Conto da Aia
  season: -1
- tvdbId: 321239
  title: The Handmaid's Tale
  searchTitle: The Handmaid's Tale
  season: -1
- tvdbId: 321239
  title: The Handmaid Tale
  searchTitle: The Handmaid Tale
  season: -1
- tvdbId: 363739
  title: The Family Chantel
  searchTitle: The Family Chantel
  season: 7
  sceneSeasonNumber: 2
  comment: Pillow Talk
  filterRegex: S02E\d+\.Pillow\.Talk

```


Example DNSMASQ config:
```
address=/services.sonarr.tv/10.0.0.115
```


Example NGINX .conf file:
```
server {
  listen    80;
  listen    443 ssl;
  server_name   services.sonarr.tv;
  ssl_certificate sonarr_services.pem;
  ssl_certificate_key sonarr_services.key;

  location / {
	proxy_pass http://10.0.0.115:3005/;
	proxy_set_header X-Real-IP $remote_addr;
	proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	proxy_set_header X-Forwarded-Proto $scheme;
	proxy_set_header X-Forwarded-Host $http_host;
	proxy_redirect off;
  }
}
```

Running on Docker:
```
docker run -p 3000:3000 -it --rm -v "$(pwd)/config/xem-mapping.json:/thexem/config/xem-mapping.json" ghcr.io/darksupremo/sonarr-services-proxy:latest
```
