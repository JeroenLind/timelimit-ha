```markdown
# TimeLimit Server Add-on  
Backend server + webinterface voor TimeLimit device usage control

Deze Home Assistant add-on installeert en draait de **TimeLimit Server**, inclusief de officiële **TimeLimit Server UI**, zodat je eenvoudig apparaten, tijdslimieten en gebruikers kunt beheren vanuit je browser.

De add-on bundelt:

- ✔ De officiële **TimeLimit Server**
- ✔ De officiële **TimeLimit Server UI** (statische webinterface)
- ✔ Een ingebouwde **Caddy-webserver** voor de UI
- ✔ Ondersteuning voor het **admin token**
- ✔ Persistente opslag in `/data/timelimit`

## 🚀 Functionaliteit

### 🔧 TimeLimit Server
De backend die alle logica uitvoert voor:

- App- en schermtijdlimieten  
- Gebruikersbeheer  
- Device synchronisatie  
- Websocket-communicatie  
- Regels, categorieën en monitoring  

De server draait standaard op:

http://<homeassistant>:8080

### 🌐 TimeLimit Server UI
Een moderne webinterface om de server te beheren.

De UI draait op:


http://<homeassistant>:8090


Je kunt hier:

- Inloggen met je admin token  
- Devices bekijken  
- Regels beheren  
- Statusinformatie opvragen  
- Synchronisatie controleren  



## 🔐 Admin Token

De TimeLimit server activeert de admin-API **alleen** wanneer een `ADMIN_TOKEN` is ingesteld.

In deze add-on stel je dat in via:

```yaml
admin_token: "jouwgeheimecode"
```

Gebruik dit token als **wachtwoord** bij Basic Auth in de UI.

> Tip: elke willekeurige string werkt.  
> Voorbeeld: `"test"` of `"my-secret-token-123"`.



## ⚙️ Configuratie

Voorbeeldconfiguratie in Home Assistant:

```yaml
port: 8080
log_level: info
data_dir: /data/timelimit
admin_token: "mijn-admin-token"
```

### Opties

| Optie        | Type | Beschrijving |
|--------------|------|--------------|
| `port`       | int  | Poort waarop de server draait (standaard 8080) |
| `log_level`  | str  | Logniveau (`info`, `debug`, `warn`, `error`) |
| `data_dir`   | str  | Persistente opslaglocatie |
| `admin_token`| str  | Token voor toegang tot de admin-API en UI |



## 📁 Bestanden & Architectuur

De add-on bouwt automatisch:

- De **TimeLimit Server** vanuit de officiële repo  
- De **TimeLimit Server UI** vanuit de officiële UI-repo  

De UI wordt geserveerd via **Caddy** op poort 8090.


## 🧪 Testen van de server

### Status-endpoint


curl -u "x:<admin_token>" http://<homeassistant>:8080/admin/status


### UI openen


http://<homeassistant>:8090

## 🛠️ Troubleshooting

### Ik zie geen `/admin` pagina
Je hebt geen `admin_token` ingesteld.  
Zet in de add-on configuratie:

```yaml
admin_token: "iets"
```

### UI laadt wel, maar kan niet verbinden
Controleer of:

- De server draait op poort 8080  
- Je admin token correct is  
- De UI de juiste server-URL gebruikt  

## 📄 Licentie

Deze add-on bundelt open-source software van het TimeLimit-project.  
Zie de respectievelijke repositories voor licentie-informatie.

## ❤️ Credits

- **TimeLimit Server**: https://codeberg.org/timelimit/timelimit-server  
- **TimeLimit Server UI**: https://codeberg.org/timelimit/timelimit-server-ui  
- Add-on packaging & integratie: *jeroenlind*


