# Premios Ibéricos 2025

Web de votaciones de los **Premios Ibéricos**, unos premios de la comunidad
hispanohablante de esports (jugadores, casters, equipos, contenido, staff,
fans...). Los usuarios entran, votan en cada categoría y pueden compartir una
imagen-resumen de sus votos.

## Stack

- **React 19 + Vite**
- **Tailwind CSS**
- **Firebase** (Auth anónima + Firestore para guardar los votos, Analytics)
- **html2canvas** para exportar el resumen de votos como imagen

## Desarrollo local

```bash
npm install
npm run dev
```

Necesitas un `.env` con la configuración de tu proyecto de Firebase
(`VITE_API_KEY`, `VITE_AUTH_DOMAIN`, `VITE_PROJECT_ID`, etc. — son las claves
públicas del SDK cliente de Firebase, protegidas por las reglas de seguridad
de Firestore, no por ser secretas).

## Despliegue

Se despliega en Firebase Hosting:

```bash
npm run build
firebase deploy
```
