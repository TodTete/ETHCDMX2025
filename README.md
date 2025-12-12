# 🌐 Cross-Chain Polling System (ETHCDMX2025)

**Cross-Chain Polling System** es una **dApp** que permite crear y participar en encuestas a través de diferentes redes blockchain.  
Actualmente soporta **Scroll Sepolia** y **Arbitrum Sepolia**, pero está diseñada para escalar a más cadenas.

[![Repo](https://img.shields.io/badge/GitHub-TodTete-blue?logo=github)](https://github.com/TodTete/ETHCDMX2025)
[![Status](https://img.shields.io/badge/status-en%20desarrollo-orange)](#estado)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## 📋 Descripción

El sistema resuelve la **fragmentación entre cadenas** unificando la experiencia de usuario.  
Todos los votos y encuestas se almacenan en **blockchain**, garantizando transparencia, inmutabilidad y resistencia a fraudes.

---

## 🚀 Características

- 🗳️ **Votación Descentralizada** → Todos los votos se guardan en la blockchain.  
- 🔗 **Compatibilidad Multi-Cadena** → Soporte inicial para **Scroll Sepolia** y **Arbitrum Sepolia**.  
- 💻 **Interfaz Moderna** → Animaciones fluidas y responsive.  
- 🌓 **Modo Oscuro/Claro** → Experiencia personalizada.  
- 🔔 **Notificaciones Toast** → Feedback en transacciones.  
- ✨ **Extras visuales** → Fondo animado de partículas + página 404 personalizada.  

---

## 🔍 Problema que Resuelve

1. **Fragmentación** → Unifica interacción entre distintas redes.  
2. **Complejidad técnica** → Interfaz simple para usuarios no técnicos.  
3. **Falta de transparencia** → Votación auditable en blockchain.  
4. **UX en dApps** → UI/UX moderna, inspirada en aplicaciones Web2.  

---

## 💡 Innovación

- 🌐 **Diseño Cross-Chain Nativo** desde cero.  
- 🎨 **UX mejorada para Web3** con animaciones y UI moderna.  
- ⚡ **Arquitectura escalable** → fácil agregar nuevas cadenas.  
- 🔔 **Feedback visual inmediato** → acciones confirmadas al instante.  

---

## 🔮 Visión Futura: Activismo Digital con Impacto Real

Queremos transformar el sistema en una herramienta de **impacto social verificable**:  

- 🏆 **Recompensas NFT** por participar.  
- 🎮 **Gamificación con propósito** → votaciones con impacto social real.  
- 📊 **Sistema de relevancia** → encuestas destacadas semanalmente.  
- 💪 **Fondos transparentes** → contratos inteligentes auditables.  

---

## 🛠️ Tecnologías Utilizadas

### **Frontend**
- Next.js 14 (App Router)  
- React 18  
- TypeScript  
- Tailwind CSS  
- shadcn/ui  
- Animaciones CSS  

### **Blockchain**
- Solidity (Smart Contracts)  
- ethers.js (interacción)  
- MetaMask (conexión de wallet)  

### **Redes soportadas**
- ✅ Scroll Sepolia  
- ✅ Arbitrum Sepolia  

---

## 📂 Estructura del proyecto

```

ETHCDMX2025/
├─ app/             # Páginas principales
├─ components/      # Componentes UI
├─ contracts/       # Smart contracts (Solidity)
├─ hooks/           # Hooks personalizados
├─ lib/             # Utilidades y configuración
├─ public/          # Recursos estáticos
├─ styles/          # Estilos globales
├─ README.md
├─ package.json
├─ next.config.mjs
├─ tailwind.config.ts
└─ tsconfig.json

````

---

## 🔧 Instalación y Uso

1. Clona el repositorio:
   ```bash
   git clone https://github.com/TodTete/ETHCDMX2025.git
   cd ETHCDMX2025

2. Instala dependencias:

   ```bash
   npm install
   ```

3. Configura las direcciones de contratos en `lib/constants.ts`.

4. Ejecuta en modo desarrollo:

   ```bash
   npm run dev
   ```

5. Abre en tu navegador:
   👉 [http://localhost:3000](http://localhost:3000)

---

## 📱 Uso de la dApp

1. **Conecta tu Wallet** (MetaMask).
2. **Selecciona una Red** → Scroll o Arbitrum Sepolia.
3. **Crea una encuesta** en la pestaña *Create Poll*.
4. **Vota** en las encuestas activas.

---

## 🚀 Despliegue de Contratos

1. Despliega en:

   * Scroll Sepolia
   * Arbitrum Sepolia

2. Métodos recomendados:

   * Remix IDE
   * Hardhat

3. Actualiza direcciones en `lib/constants.ts`.

4. Despliega el frontend en **Vercel** u otra plataforma.

📌 **Contratos verificados:**

* [Scroll Sepolia](https://sepolia.scrollscan.com/address/0xD38D3C4865c784100493d4eAfAA2BFA37C28FA31)
* [Arbitrum Sepolia](https://sepolia.arbiscan.io/address/0x4f523935f69247c6780536f4f38febc8bf5cec55#code)

---

## 👨‍💻 Autor

**Ricardo Vallejo Sacnhez (@TodTete) 5 Mayo 2025**
🔗 [Repositorio oficial](https://github.com/TodTete/ETHCDMX2025)

---

## 📄 Licencia

Este proyecto está bajo licencia **MIT**.
Consulta el archivo [`LICENSE`](LICENSE) para más información.

---

## 🙏 Agradecimientos

* A **Scroll** y **Arbitrum** por sus testnets.
* A la comunidad **Ethereum/Web3** por el soporte y recursos.
