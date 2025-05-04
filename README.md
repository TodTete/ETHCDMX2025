# Cross-Chain Polling System

## 📋 Descripción

Cross-Chain Polling System es una aplicación descentralizada (dApp) que permite a los usuarios crear y participar en encuestas a través de diferentes redes blockchain. La aplicación está diseñada para funcionar en múltiples cadenas, específicamente en Scroll Sepolia y Arbitrum Sepolia, permitiendo a los usuarios interactuar con la misma interfaz independientemente de la red que estén utilizando.

## 🚀 Características

- **Votación Descentralizada**: Todas las encuestas y votos se almacenan en la blockchain, garantizando transparencia e inmutabilidad.
- **Compatibilidad Multi-Cadena**: Funciona en Scroll Sepolia y Arbitrum Sepolia, con la capacidad de expandirse a más redes.
- **Interfaz Moderna y Responsiva**: Diseño atractivo con animaciones fluidas y soporte para dispositivos móviles.
- **Modo Oscuro/Claro**: Cambia entre temas para una mejor experiencia visual.
- **Notificaciones Toast**: Retroalimentación clara sobre acciones del usuario y transacciones.
- **Fondo Animado de Partículas**: Visualización dinámica que mejora la experiencia del usuario.
- **Página 404 Personalizada**: Manejo elegante de rutas no encontradas.

## 🔍 Problema que Resuelve

El proyecto aborda varios desafíos importantes en el ecosistema blockchain:

1. **Fragmentación entre Cadenas**: Unifica la experiencia de usuario a través de diferentes redes blockchain, permitiendo a los usuarios interactuar con la misma aplicación independientemente de la red que estén utilizando.

2. **Complejidad de Uso**: Simplifica la interacción con contratos inteligentes a través de una interfaz intuitiva y amigable, haciendo que la tecnología blockchain sea más accesible para usuarios no técnicos.

3. **Transparencia en Votaciones**: Proporciona un sistema de votación transparente e inmutable donde todos los votos son verificables en la blockchain, eliminando preocupaciones sobre manipulación o fraude.

4. **Experiencia de Usuario en dApps**: Mejora significativamente la experiencia de usuario en aplicaciones descentralizadas, que tradicionalmente han sido menos atractivas y funcionales que las aplicaciones web tradicionales.

## 💡 Innovación

- **Diseño Cross-Chain Nativo**: Diseñado desde cero para funcionar en múltiples cadenas, permitiendo una experiencia unificada.
- **UX Mejorada para Web3**: Incorpora elementos de diseño modernos y animaciones para hacer que la interacción con la blockchain sea más atractiva.
- **Arquitectura Escalable**: El sistema está diseñado para agregar fácilmente soporte para más redes blockchain.
- **Feedback Visual Inmediato**: Proporciona retroalimentación visual inmediata para acciones que normalmente tomarían tiempo en confirmarse en la blockchain.

## 🔮 Visión Futura: Activismo Digital con Impacto Real

> ¿Te gustaría convertir tu opinión en impacto real?

Estamos desarrollando una expansión del sistema que transformará la forma en que las encuestas pueden generar cambio social:

### 🏆 Recompensas por Participación
- Vota en encuestas sociales clave y entra automáticamente al sorteo de NFTs exclusivos como recompensa por tu participación.

### 🎮 Gamificación con Propósito
- Al gamificar la experiencia, podrás apoyar causas que conecten con tu postura.
- **Ejemplo**: "¿Consideras que el aborto debería ser legal?"
  - Vota Sí o No.
  - Si la pregunta alcanza alta relevancia, se activa un fondo de impacto social.
  - 🟢 Si gana el Sí, los fondos podrían destinarse a campañas de concientización o apoyo a clínicas comunitarias.
  - 🔴 Si gana el No, los fondos podrían apoyar alternativas como programas educativos o apoyo familiar.

### 📊 Sistema de Relevancia
- Las preguntas con más votos o mayor recaudación se destacarán semanalmente.
- En caso de empate, se activaría un sistema dinámico de "doble votación" o participación extra que decide el destino final del fondo.

### 💪 Impacto y Transparencia
- Aborda el activismo digital con impacto directo, algo muy atractivo para jóvenes y comunidades Web3.
- **Fondo transparente**: El uso de contratos inteligentes auditables para demostrar cómo se usan los fondos aumentaría la confianza.

Esta funcionalidad está en desarrollo y representa nuestra visión para convertir el sistema de encuestas en una herramienta de cambio social real y verificable.

## 🛠️ Tecnologías Utilizadas

- **Frontend**:
  - Next.js 14 (App Router)
  - React 18
  - TypeScript
  - Tailwind CSS
  - shadcn/ui (componentes)
  - CSS Animations

- **Blockchain**:
  - Solidity (Smart Contracts)
  - ethers.js (Interacción con blockchain)
  - MetaMask (Wallet connection)

- **Redes**:
  - Scroll Sepolia
  - Arbitrum Sepolia

## 🔧 Instalación y Uso

1. Clona este repositorio:
   \`\`\`bash
   git clone https://github.com/Tete/cross-chain-polling.git
   cd cross-chain-polling
   \`\`\`

2. Instala las dependencias:
   \`\`\`bash
   npm install
   \`\`\`

3. Configura las direcciones de los contratos:
   - Edita el archivo `lib/constants.ts` y actualiza las direcciones de los contratos para Scroll y Arbitrum.

4. Inicia el servidor de desarrollo:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📱 Uso de la Aplicación

1. **Conecta tu Wallet**: Haz clic en "Connect Wallet" para conectar MetaMask.
2. **Selecciona una Red**: Elige entre Scroll Sepolia o Arbitrum Sepolia.
3. **Crea una Encuesta**: Ve a la pestaña "Create Poll", ingresa una pregunta y opciones.
4. **Vota en Encuestas**: Explora las encuestas existentes y vota en ellas.

## 🚀 Despliegue

El contrato inteligente debe desplegarse en:
1. Scroll Sepolia Testnet
2. Arbitrum Sepolia Testnet

Instrucciones detalladas para el despliegue:

1. Usa Remix IDE o Hardhat para desplegar el contrato `SimplePoll.sol`.
2. Actualiza las direcciones de los contratos en `lib/constants.ts`.
3. Despliega el frontend en Vercel o tu plataforma preferida.

## 👨‍💻 Autor

**@Tete**

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- Gracias a Scroll y Arbitrum por proporcionar las redes de prueba.
- Gracias a la comunidad de Ethereum por su continuo apoyo al desarrollo de dApps.

## Extra 

Sepolia address 
https://sepolia.scrollscan.com/address/0xD38D3C4865c784100493d4eAfAA2BFA37C28FA31
