# TimeLimit Server Patches

Deze directory bevat aangepaste TypeScript bestanden die over de originele TimeLimit server code heen worden gekopieerd tijdens de Docker build.

## Toegevoegde patches:

### 1. `src/function/sync/apply-actions/dispatch-parent-action/adduser.ts`
**Doel:** Enhanced logging voor ADD_USER acties

**Wat het doet:**
- Logt alle ADD_USER actie parameters (userId, name, userType, timeZone)
- Logt expliciet wanneer database create wordt aangeroepen
- Bij succes: logt succesbericht met userId
- Bij fout: logt gedetailleerde error informatie (error message, code, fields, stack)

**Waarom dit nodig is:**
De originele code heeft geen console logging, waardoor het onmogelijk is om te debuggen waarom een ADD_USER actie `shouldDoFullSync: true` retourneert zonder dat er een exception wordt gegooid.

### 2. `src/function/sync/apply-actions/index.ts`
**Doel:** Enhanced error logging in de centrale action dispatcher

**Wat het doet:**
- Logt alle exceptions die optreden tijdens action processing
- Include actie type, actie data, error message, error name, en error code
- Maakt debugging van server-side fouten mogelijk zonder toegang tot database logs

**Waarom dit nodig is:**
De originele error handler telt alleen events maar logt niet de foutdetails naar console, waardoor het onmogelijk is om te zien waarom een actie faalt.

## Gebruik

De patches worden automatisch toegepast tijdens de Docker build:

```bash
# Rebuild image met patches
cd C:\git\timelimit-ha\timelimitserver
docker build -t timelimitserver:latest .

# Of via docker-compose
docker-compose build timelimitserver
docker-compose up -d timelimitserver
```

## Logs bekijken

Na rebuild kun je de logs bekijken met:

```bash
docker logs timelimitserver -f
```

Bij ADD_USER acties zul je nu zien:
```
[ADD-USER] Processing action: {userId: 'abc123', userType: 'child', name: 'Jantje', ...}
[ADD-USER] Creating user in database...
[ADD-USER] ✅ User created successfully: abc123
```

Of bij fouten:
```
[ADD-USER] ❌ FAILED to create user: {
  userId: 'abc123',
  error: 'Duplicate entry',
  code: 'ER_DUP_ENTRY',
  ...
}
[APPLY-ACTIONS] ❌ Error processing action: {
  actionType: 'parent',
  errorMessage: '...',
  ...
}
```

## Rollback

Om terug te gaan naar de originele code zonder patches:

1. Verwijder de `COPY patches/ /build/` regel uit Dockerfile
2. Rebuild de image

## Onderhoud

Deze patches zijn gebaseerd op de TimeLimit server versie die wordt gecloned van:
https://codeberg.org/timelimit/timelimit-server.git

Als de upstream server wordt geüpdatet, kunnen deze patches mogelijk niet meer clean mergen. In dat geval moet de patch code worden aangepast aan de nieuwe versie.
