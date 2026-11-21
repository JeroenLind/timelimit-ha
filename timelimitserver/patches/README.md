# TimeLimit Server patches

Diff-patches (`*.patch`) die tijdens de Docker build met `git apply` op de gecloonde
upstream-server worden toegepast. Ze voegen alleen extra logging toe:

- `0001-apply-actions-error-logging.patch`: logt mislukte acties in
  `src/function/sync/apply-actions/index.ts` (type en foutmelding; de volledige actiedata
  alleen als de add-on-optie `debug` aan staat).
- `0002-adduser-logging.patch`: logt `ADD_USER`-fouten (en bij debug de parameters) in
  `.../dispatch-parent-action/adduser.ts`.

`run.sh` zet `TIMELIMIT_DEBUG=1` als `debug: true`; anders blijft de logging beperkt.

## Upstream bijwerken

De Dockerfile gebruikt `UPSTREAM_REF` (nu de commit `b0b50389be29c78144b60d9e1e1187fa9ce3d34d`).
Een nieuwere upstream proberen: zet `UPSTREAM_REF=master` (build-arg) en kijk of
`git apply` nog slaagt. Zo niet: maak de patches opnieuw in een lokale clone met
`git diff -- <bestand> > patches/000N-naam.patch`.
