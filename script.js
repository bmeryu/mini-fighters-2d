// Obtención de elementos del DOM
const splashScreen = document.getElementById('splash-screen');
const continueButton = document.getElementById('continue-button');
const gameWrapper = document.getElementById('game-wrapper');
const mainHeader = document.getElementById('main-header');
const gameHeader = document.getElementById('game-header');
const mainTitle = document.getElementById('main-title');
const gameUiTop = document.getElementById('game-ui-top');

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d'); // Contexto 2D para dibujar en el canvas

const player1HealthBar = document.getElementById('player1HealthBar');
const player2HealthBar = document.getElementById('player2HealthBar');
const player1PowerBar = document.getElementById('player1PowerBar');
const player2PowerBar = document.getElementById('player2PowerBar');
const player1NameDisplay = document.getElementById('player1NameDisplay');
const player2NameDisplay = document.getElementById('player2NameDisplay');

const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const gameOverModal = document.getElementById('gameOverModal');
const winnerMessage = document.getElementById('winnerMessage');
const gameOverMessage = document.getElementById('gameOverMessage');
const controlsPanel = document.getElementById('controls-panel');

const characterGrid = document.getElementById('character-grid');
const p1SelectedCharImg = document.getElementById('p1-selected-char-img');
const p1SelectedCharName = document.getElementById('p1-selected-char-name');
const p2SelectedCharImg = document.getElementById('p2-selected-char-img');
const p2SelectedCharName = document.getElementById('p2-selected-char-name');
const selectionPrompt = document.getElementById('selection-prompt');

// Constantes del juego
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const GRAVITY = 0.7; // Gravedad que afecta a los jugadores
const BASE_PLAYER_SPEED = 4; // Velocidad base de movimiento
const BASE_JUMP_STRENGTH = 15; // Fuerza de salto
const MAX_HEALTH = 150; // Salud máxima
const PUNCH_DAMAGE = 10; // Daño del golpe
const KICK_DAMAGE = 13; // Daño de la patada
const PUNCH_RANGE = 50; // Rango del golpe
const KICK_RANGE = 60; // Rango de la patada
const ATTACK_ANIMATION_DURATION = 150; // Duración de la animación de ataque
const ATTACK_LOGIC_DURATION = 200; // Duración de la lógica de detección de ataque
const ATTACK_COOLDOWN = 550; // Original: 700. Reducido para un combate más rápido.
const BASE_KNOCKBACK_STRENGTH = 12; // Original: 10. Aumentado para un mayor impacto.
const HIT_EFFECT_LIFETIME = 30; // Duración de los efectos de golpe

// --- Constantes de Balance de Poder ---
const POWER_GAIN_PER_CLICK = 5; // Poder ganado por cada clic válido.
const CLICK_COOLDOWN = 100; // Enfriamiento de 100ms entre clics para evitar spam.
const AI_PASSIVE_POWER_GAIN = 0.35; // Poder que el PC gana pasivamente por frame.

// Constantes de la IA
const AI_ACTION_INTERVAL = 250; // Intervalo para que la IA tome decisiones (más rápido)
const AI_MOVE_CHANCE = 0.7; // Probabilidad de que la IA se mueva
const AI_JUMP_CHANCE = 0.15; // Probabilidad de que la IA salte (ligeramente mayor)
const AI_ATTACK_CHANCE_IN_RANGE = 0.75; // Probabilidad de que la IA ataque si está cerca (mayor)
const AI_KICK_CHANCE = 0.4; // Probabilidad de que la IA use una patada en lugar de un puñetazo

// Constantes de poder y ataques especiales
const MAX_POWER = 150; // Poder máximo
const POWER_GAIN_PER_HIT = 25; // Poder ganado por cada golpe exitoso
const SUPER_PUNCH_DAMAGE = 30; // Daño del super golpe
const SUPER_KICK_DAMAGE = 35; // Daño de la super patada

// Constantes específicas para el superpoder de Piraña
const PIRANHA_PROJECTILE_SPEED = 5; // Velocidad de las pirañas reducida (original: 8)
const PIRANHA_PROJECTILE_LIFESPAN = 60;
const PIRANHA_PROJECTILE_WIDTH = 30;
const PIRANHA_PROJECTILE_HEIGHT = 20;
const PIRANHA_PROJECTILE_DAMAGE = 15;
const PIRANHA_PROJECTILE_COUNT = 3;

// Constantes específicas para el superpoder de La Ex (Lluvia de Billetes)
const MONEY_RAIN_COUNT = 5; // Número de grupos de billetes
const MONEY_RAIN_WAD_WIDTH = 30; // Ancho del fajo de billetes
const MONEY_RAIN_WAD_HEIGHT = 20; // Alto del fajo de billetes
const MONEY_RAIN_DAMAGE = 10;
const MONEY_RAIN_INITIAL_Y = -MONEY_RAIN_WAD_HEIGHT;
const COIN_RAIN_DAMAGE = 5;

// Constantes específicas para el superpoder de Burric (Calculadoras)
const CALCULATOR_PROJECTILE_LIFESPAN = 120; // Aumentar vida útil
const CALCULATOR_PROJECTILE_WIDTH = 40;
const CALCULATOR_PROJECTILE_HEIGHT = 50;
const CALCULATOR_PROJECTILE_DAMAGE = 18;
const CALCULATOR_PROJECTILE_COUNT = 5; // Más calculadoras
const CALCULATOR_INITIAL_Y = -CALCULATOR_PROJECTILE_HEIGHT;

// Constantes específicas para el superpoder de Matthei Bolt
const BOLT_DASH_SPEED = 22.5; // Reducido un 10% de 25
const BOLT_DASH_COUNT = 5;
const BOLT_DASH_DAMAGE = 8;

// Constantes específicas para el superpoder de El Zanjas
const ZANJAS_CRACK_DAMAGE = 40;
const ZANJAS_SWALLOWED_DURATION = 90; // Duración en frames
const ZANJAS_CRACK_WIDTH = 150;
const ZANJAS_CRACK_MAX_HEIGHT = 80;
const ZANJAS_CRACK_LIFESPAN = 180; // Total de frames para animación

// Constantes específicas para el superpoder de Carolina Papelucho
const PAPELUCHO_STUN_DURATION = 180; // 3 segundos a 60fps
const PAPELUCHO_PAPER_COUNT = 20;
const PAPELUCHO_PAPER_WIDTH = 25;
const PAPELUCHO_PAPER_HEIGHT = 35;
const PAPELUCHO_PAPER_DAMAGE = 1;

// Constantes específicas para el superpoder de Orsini Love
const ORSINI_KISS_SPEED = 7;
const ORSINI_KISS_LIFESPAN = 90;
const ORSINI_KISS_WIDTH = 30;
const ORSINI_KISS_HEIGHT = 25;
const ORSINI_KISS_DAMAGE = 18;
const ORSINI_KISS_COUNT = 2;

// Constantes específicas para el superpoder de Escape Room Jackson
const JACKSON_INVISIBILITY_DURATION = 120; // 2 segundos a 60fps
const JACKSON_CONFUSION_DURATION = 120;
const SMOKE_PARTICLE_COUNT = 30;

// Constantes para el superpoder de Tía Cote
const TIA_COTE_BEAM_DURATION = 120; // El rayo dura 2 segundos (a 60fps)
const TIA_COTE_BEAM_WIDTH = 90; // Ancho del rayo
const TIA_COTE_BEAM_DAMAGE_PER_FRAME = 0.5; // Daño por cada frame que el oponente está en el rayo
const TIA_COTE_HEART_SPEED = 6;
const TIA_COTE_HEART_LIFESPAN = 90;
const TIA_COTE_HEART_WIDTH = 25;
const TIA_COTE_HEART_HEIGHT = 22;
const TIA_COTE_HEART_DAMAGE = 2;
const TIA_COTE_HEART_COUNT = 25; // Aumentado para efecto "cariñosito"


// Variables para el efecto de temblor de pantalla
let screenShakeMagnitude = 0;
let screenShakeTimeLeft = 0;

let gameActive = false; // Estado del juego (activo o en pausa)
let players = []; // Array para almacenar los objetos Player
let activeHitEffects = []; // Array para los efectos visuales de golpe
const hitWords = ["¡POW!", "¡BAM!", "¡CRASH!", "¡KAPOW!", "¡WHAM!", "¡SLAP!", "¡BOOM!", "¡BANG!", "¡PUFF!", "¡THWACK!"];
const hitWordColors = ["#FFD700", "#FF4500", "#ADFF2F", "#00FFFF", "#FF69B4", "#FFFF00", "#FF1493"];

let backgroundMusic; // Objeto de audio para la música de fondo

const characterBackgrounds = {
    "El Zanjas": ["img/lazanja.png"],
    "Tía Cote": ["img/glitter.png"],
    "Escape Room Jackson": ["img/happyhour.png"],
    "Piraña": ["img/lamoneda.png"],
    "La Ex": ["img/lamoneda.png"],
    "Matthei Bolt": ["img/pasillomoneda.png"],
    "Burric": ["img/pasillomoneda.png"],
    "Orsini Love": ["img/pasillomoneda.png"],
    "Carolina Papelucho": ["img/pasillomoneda.png"]
};


// Definición de los assets de los personajes (imágenes, colores, etc.)
const characterAssets = [
    {
        name: "Piraña",
        baseColor: '#e0e0e0',
        previewImage: "img/personaje1-cabeza.png",
        textures: {
            head: "img/personaje1-cabeza.png",
            torso: "img/personaje1-torso.png",
            upperArm: "img/personaje1-brazos.png",
            foreArm: "img/personaje1-antebrazos.png",
            thigh: "img/personaje1-muslos.png",
            lowerLeg: "img/personaje1-piernasbajas.png",
            glove_r: "img/personaje1-guantes-d.png",
            glove_l: "img/personaje1-guantes-i.png",
            glove: null,
            shoe: "img/personaje1-zapatos.png",
            superEffectTexture: "img/personaje1-super-effect.png"
        }
    },
    {
        name: "La Ex",
        baseColor: '#c0392b',
        previewImage: "img/personaje2-cabeza.png",
        textures: {
            head: "img/personaje2-cabeza.png",
            torso: "img/personaje2-torso.png",
            upperArm: "img/personaje2-brazos.png",
            foreArm: "img/personaje2-antebrazos.png",
            thigh: "img/personaje2-muslos.png",
            lowerLeg: "img/personaje2-piernasbajas.png",
            glove_r: "img/personaje2-guantes-d.png",
            glove_l: "img/personaje2-guantes-i.png",
            glove: null,
            shoe: "img/personaje2-zapatos.png",
            superEffectTexture: "img/personaje2-super-effect.png"
        }
    },
    {
        name: "Burric",
        baseColor: '#27ae60',
        previewImage: "img/personaje3-cabeza.png",
        textures: {
            head: "img/personaje3-cabeza.png",
            torso: "img/personaje3-torso.png",
            upperArm: "img/personaje3-brazos.png",
            foreArm: "img/personaje3-antebrazos.png",
            thigh: "img/personaje3-muslos.png",
            lowerLeg: "img/personaje3-piernasbajas.png",
            glove_r: "img/personaje3-guantes-d.png",
            glove_l: "img/personaje3-guantes-i.png",
            glove: null,
            shoe: "img/personaje3-zapatos.png",
            superEffectTexture: "img/personaje3-super-effect.png"
        }
    },
    {
        name: "Matthei Bolt",
        baseColor: '#f39c12',
        previewImage: "img/personaje4-cabeza.png",
        textures: {
            head: "img/personaje4-cabeza.png",
            torso: "img/personaje4-torso.png",
            upperArm: "img/personaje4-brazos.png",
            foreArm: "img/personaje4-antebrazos.png",
            thigh: "img/personaje4-muslos.png",
            lowerLeg: "img/personaje4-piernasbajas.png",
            glove_r: "img/personaje4-guantes-d.png",
            glove_l: "img/personaje4-guantes-i.png",
            glove: null,
            shoe: "img/personaje4-zapatos.png",
            superEffectTexture: "img/personaje4-super-effect.png",
            yellowVest: "img/matthei-chaleco.png" 
        }
    },
    {
        name: "Carolina Papelucho",
        baseColor: '#d35400',
        previewImage: "img/personaje5-cabeza.png",
        textures: {
            head: "img/personaje5-cabeza.png",
            torso: "img/personaje5-torso.png",
            upperArm: "img/personaje5-brazos.png",
            foreArm: "img/personaje5-antebrazos.png",
            thigh: "img/personaje5-muslos.png",
            lowerLeg: "img/personaje5-piernasbajas.png",
            glove_r: "img/personaje5-guantes-d.png",
            glove_l: "img/personaje5-guantes-i.png",
            glove: null,
            shoe: "img/personaje5-zapatos.png",
            superEffectTexture: "img/personaje5-super-effect.png"
        }
    },
    {
        name: "El Zanjas",
        baseColor: '#7f8c8d',
        previewImage: "img/personaje6-cabeza.png",
        textures: {
            head: "img/personaje6-cabeza.png",
            torso: "img/personaje6-torso.png",
            upperArm: "img/personaje6-brazos.png",
            foreArm: "img/personaje6-antebrazos.png",
            thigh: "img/personaje6-muslos.png",
            lowerLeg: "img/personaje6-piernasbajas.png",
            glove_r: "img/personaje6-guantes-d.png",
            glove_l: "img/personaje6-guantes-i.png",
            glove: null,
            shoe: "img/personaje6-zapatos.png",
            superEffectTexture: "img/personaje6-super-effect.png"
        }
    },
    {
        name: "Orsini Love",
        baseColor: '#ff69b4', // HotPink
        previewImage: "img/personaje7-cabeza.png",
        textures: {
            head: "img/personaje7-cabeza.png",
            torso: "img/personaje7-torso.png",
            upperArm: "img/personaje7-brazos.png",
            foreArm: "img/personaje7-antebrazos.png",
            thigh: "img/personaje7-muslos.png",
            lowerLeg: "img/personaje7-piernasbajas.png",
            glove_r: "img/personaje7-guantes-d.png",
            glove_l: "img/personaje7-guantes-i.png",
            glove: null,
            shoe: "img/personaje7-zapatos.png",
            superEffectTexture: "img/personaje7-super-effect.png"
        }
    },
    {
        name: "Escape Room Jackson",
        baseColor: '#6c757d', // Gray
        previewImage: "img/personaje8-cabeza.png",
        textures: {
            head: "img/personaje8-cabeza.png",
            torso: "img/personaje8-torso.png",
            upperArm: "img/personaje8-brazos.png",
            foreArm: "img/personaje8-antebrazos.png",
            thigh: "img/personaje8-muslos.png",
            lowerLeg: "img/personaje8-piernasbajas.png",
            glove_r: "img/personaje8-guantes-d.png",
            glove_l: "img/personaje8-guantes-i.png",
            glove: null,
            shoe: "img/personaje8-zapatos.png",
            superEffectTexture: "img/personaje8-super-effect.png"
        }
    },
    {
        name: "Tía Cote",
        baseColor: '#9b59b6', // Amethyst
        previewImage: "img/personaje9-cabeza.png",
        textures: {
            head: "img/personaje9-cabeza.png",
            torso: "img/personaje9-torso.png",
            upperArm: "img/personaje9-brazos.png",
            foreArm: "img/personaje9-antebrazos.png",
            thigh: "img/personaje9-muslos.png",
            lowerLeg: "img/personaje9-piernasbajas.png",
            glove_r: "img/personaje9-guantes-d.png",
            glove_l: "img/personaje9-guantes-i.png",
            glove: null,
            shoe: "img/personaje9-zapatos.png",
            superEffectTexture: "img/personaje9-super-effect.png"
        }
    }
];

const bodyTypeStats = {
    normal: { width: 50, height: 100, speedMod: 1.0, damageMod: 1.0, rangeMod: 1.0, healthMod: 1.0 }
};

const ARM_GUARD_UPPER_ANGLE = Math.PI / 4.2;
const ARM_GUARD_FOREARM_BEND = -Math.PI / 1.6;
const ARM_PUNCH_UPPER_EXTEND_ANGLE = -Math.PI / 18;
const ARM_PUNCH_FOREARM_EXTEND_ANGLE = Math.PI / 30;
const ARM_PUNCH_UPPER_RECOIL_ANGLE = -Math.PI / 3;
const ARM_PUNCH_FOREARM_RECOIL_ANGLE = Math.PI / 2.2;
const LEG_ANGLE_RESTING_FRONT = Math.PI / 2 - Math.PI / 20;
const LEG_ANGLE_RESTING_BACK = Math.PI / 2 + Math.PI / 30;
const LEG_ANGLE_KICK_STRIKE = -Math.PI / 18;
const LEG_ANGLE_KICK_SUPPORT = Math.PI / 2 + Math.PI / 6;
const BOXING_GLOVE_COLOR = '#c00000';
const DEFAULT_SHOE_COLOR = '#4a5568';

let playerSelectedCharIndex = -1;
let pcSelectedCharIndex = -1;
let pcSelectionInterval = null; // Variable para el intervalo de la ruleta del PC
let smokeParticles = [];

class Player {
    constructor(x, initialY, characterAsset, isPlayer1 = true, facingRight = true) {
        this.name = characterAsset.name;
        this.x = x;
        this.baseColor = characterAsset.baseColor;
        this.isPlayer1 = isPlayer1;
        this.facingRight = facingRight;

        this.headTextureImage = this.loadTexture(characterAsset.textures.head);
        this.bodyTextureImage = this.loadTexture(characterAsset.textures.torso);
        this.upperArmTextureImage = this.loadTexture(characterAsset.textures.upperArm);
        this.foreArmTextureImage = this.loadTexture(characterAsset.textures.foreArm);

        this.thighTextureImage = this.loadTexture(characterAsset.textures.thigh);
        this.lowerLegTextureImage = this.loadTexture(characterAsset.textures.lowerLeg);

        this.gloveTextureImage_r = this.loadTexture(characterAsset.textures.glove_r);
        this.gloveTextureImage_l = this.loadTexture(characterAsset.textures.glove_l);
        this.gloveTextureImage = this.loadTexture(characterAsset.textures.glove);
        this.shoeTextureImage = this.loadTexture(characterAsset.textures.shoe);
        this.superEffectTextureImage = this.loadTexture(characterAsset.textures.superEffectTexture);
        this.piranhaProjectileTextureImage = this.loadTexture(characterAsset.textures.piranhaProjectileTexture);
        this.moneyWadTextureImage = this.loadTexture(characterAsset.textures.moneyWadTexture);
        this.calculatorProjectileTextureImage = this.loadTexture(characterAsset.textures.calculatorProjectileTexture);
        this.paperProjectileTexture = this.loadTexture(characterAsset.textures.paperProjectileTexture);
        this.yellowVestTextureImage = this.loadTexture(characterAsset.textures.yellowVest);

        this.limbColorFallback = this.baseColor;

        this.setStats();
        this.y = initialY - this.height;
        this.initialX = x;
        this.initialY = initialY;
        this.velocityX = 0;
        this.velocityY = 0;
        this.isJumping = false;
        this.health = MAX_HEALTH * this.healthMod;
        this.maxHealth = MAX_HEALTH * this.healthMod;

        this.power = 0;
        this.maxPower = MAX_POWER;
        this.isSuperCharged = false;
        this.lastPowerClickTime = 0; // Para el enfriamiento de clics de poder
        this.isPerformingSuperAttackAnimation = false;
        this.activePiranhaProjectiles = [];
        this.activeMoneyWads = [];
        this.activeCoins = [];
        this.activeCalculators = [];
        this.activePapers = [];
        this.activeKisses = [];
        this.activeHearts = []; // Array para los corazones de Tía Cote

        // Estado del superpoder de Bolt
        this.isDashing = false;
        this.dashCount = 0;
        this.dashTargetX = 0;
        this.dashDamageApplied = false;
        this.trail = [];

        this.isPunching = false;
        this.isKicking = false;
        this.attackVisualActive = false;
        this.lastAttackTime = 0;
        this.lastAIDecisionTime = 0;
        this.currentAction = null;
        this.attackArm = null;
        this.nextPunchArm = 'right';

        // Estado de "El Zanjas"
        this.isCastingCrack = false;
        this.crackTimer = 0;
        this.crackOpponentHit = false;
        this.crackCenterX = 0;

        // Estado para superpoder Tía Cote
        this.isCastingBeam = false;
        this.beamTimer = 0;

        // Estado de ser tragado o aturdido
        this.isSwallowed = false;
        this.swallowedTimer = 0;
        this.isStunned = false;
        this.stunTimer = 0;

        // Estado de Escape Room Jackson
        this.isInvisible = false;
        this.invisibilityTimer = 0;
        this.isConfused = false;
        this.confusionTimer = 0;
        this.confusionBlinkTimer = 0;
        this.showBlurred = false;
    }

    loadTexture(src) {
        if (!src) return null;
        const img = new Image();
        img.src = src;
        img.onload = () => { /* console.log('Texture loaded:', src); */ };
        img.onerror = () => {
            console.warn('Error loading texture:', src, '- Will use base color or shape for this part.');
            if (this.headTextureImage && this.headTextureImage.src && this.headTextureImage.src.endsWith(src)) this.headTextureImage = null;
            else if (this.bodyTextureImage && this.bodyTextureImage.src && this.bodyTextureImage.src.endsWith(src)) this.bodyTextureImage = null;
            else if (this.upperArmTextureImage && this.upperArmTextureImage.src && this.upperArmTextureImage.src.endsWith(src)) this.upperArmTextureImage = null;
            else if (this.foreArmTextureImage && this.foreArmTextureImage.src && this.foreArmTextureImage.src.endsWith(src)) this.foreArmTextureImage = null;
            else if (this.thighTextureImage && this.thighTextureImage.src && this.thighTextureImage.src.endsWith(src)) this.thighTextureImage = null;
            else if (this.lowerLegTextureImage && this.lowerLegTextureImage.src && this.lowerLegTextureImage.src.endsWith(src)) this.lowerLegTextureImage = null;
            else if (this.gloveTextureImage_r && this.gloveTextureImage_r.src && this.gloveTextureImage_r.src.endsWith(src)) this.gloveTextureImage_r = null;
            else if (this.gloveTextureImage_l && this.gloveTextureImage_l.src && this.gloveTextureImage_l.src.endsWith(src)) this.gloveTextureImage_l = null;
            else if (this.gloveTextureImage && this.gloveTextureImage.src && this.gloveTextureImage.src.endsWith(src)) this.gloveTextureImage = null;
            else if (this.shoeTextureImage && this.shoeTextureImage.src && this.shoeTextureImage.src.endsWith(src)) this.shoeTextureImage = null;
            else if (this.superEffectTextureImage && this.superEffectTextureImage.src && this.superEffectTextureImage.src.endsWith(src)) this.superEffectTextureImage = null;
            else if (this.piranhaProjectileTextureImage && this.piranhaProjectileTextureImage.src && this.piranhaProjectileTextureImage.src.endsWith(src)) this.piranhaProjectileTextureImage = null;
            else if (this.moneyWadTextureImage && this.moneyWadTextureImage.src && this.moneyWadTextureImage.src.endsWith(src)) this.moneyWadTextureImage = null;
            else if (this.calculatorProjectileTextureImage && this.calculatorProjectileTextureImage.src && this.calculatorProjectileTextureImage.src.endsWith(src)) this.calculatorProjectileTextureImage = null;
            else if (this.yellowVestTextureImage && this.yellowVestTextureImage.src && this.yellowVestTextureImage.src.endsWith(src)) this.yellowVestTextureImage = null;
        };
        return img;
    }

    setStats() {
        const stats = bodyTypeStats.normal;

        this.width = stats.width;
        this.height = stats.height;
        this.speed = BASE_PLAYER_SPEED * stats.speedMod;
        this.punchDamage = PUNCH_DAMAGE * stats.damageMod;
        this.kickDamage = KICK_DAMAGE * stats.damageMod;
        this.punchRange = PUNCH_RANGE * stats.rangeMod;
        this.kickRange = KICK_RANGE * stats.rangeMod;
        this.attackCooldown = ATTACK_COOLDOWN;
        this.jumpStrength = BASE_JUMP_STRENGTH;
        this.knockbackStrength = BASE_KNOCKBACK_STRENGTH;
        this.healthMod = stats.healthMod;

        let headSizeRatioFactor = 1.5;
        let torsoHeightRatio = 0.5;
        let torsoWidthRatio = 0.8;
        let armWidthRatio = 0.20;
        let armLengthTotalRatio = 0.85;
        let legSegmentsTotalHeightRatio = 0.26;
        let shoeHeightRatio = 0.22;
        let shoeWidthFactor = 1.6;
        let legWidthRatio = 0.22;
        let gloveSizeFactor = 3.0;

        this.headSize = (this.width * 0.5) * headSizeRatioFactor;
        this.torsoHeight = this.height * torsoHeightRatio;
        this.torsoWidth = this.width * torsoWidthRatio;
        this.armWidth = this.width * armWidthRatio;
        const totalArmLength = this.torsoHeight * armLengthTotalRatio;
        this.upperArmLength = totalArmLength * 0.5;
        this.foreArmLength = totalArmLength * 0.5;

        const totalLegSegmentsCombinedH = this.height * legSegmentsTotalHeightRatio;
        this.thighHeight = totalLegSegmentsCombinedH * 0.5;
        this.lowerLegHeight = totalLegSegmentsCombinedH * 0.5;
        this.legWidth = this.torsoWidth * legWidthRatio;

        this.gloveSize = this.armWidth * gloveSizeFactor;
        this.shoeHeight = this.height * shoeHeightRatio;
        this.shoeWidth = this.legWidth * shoeWidthFactor;
    }

    drawPartWithTexture(partName, destX, destY, destWidth, destHeight, shouldFlipHorizontally = false) {
        let currentTexture = null;
        let fillColor = this.baseColor;
        if (partName === 'head') currentTexture = this.headTextureImage;
        else if (partName === 'torso') currentTexture = this.bodyTextureImage;
        else if (partName === 'arm_upper') currentTexture = this.upperArmTextureImage;
        else if (partName === 'arm_fore') currentTexture = this.foreArmTextureImage;
        else if (partName === 'thigh') currentTexture = this.thighTextureImage;
        else if (partName === 'lower_leg') currentTexture = this.lowerLegTextureImage;

        if (currentTexture && currentTexture.complete && currentTexture.width > 0) {
            ctx.save();
            if (shouldFlipHorizontally) {
                ctx.translate(destX + destWidth, destY);
                ctx.scale(-1, 1);
                ctx.drawImage(currentTexture, 0, 0, currentTexture.width, currentTexture.height, 0, 0, destWidth, destHeight);
            } else {
                ctx.drawImage(currentTexture, 0, 0, currentTexture.width, currentTexture.height, destX, destY, destWidth, destHeight);
            }
            ctx.restore();
        } else {
            if (partName !== 'shoe') {
                ctx.fillStyle = 'magenta';
                ctx.fillRect(destX, destY, destWidth, destHeight);
                ctx.fillStyle = 'white';
                ctx.font = '8px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(partName.toUpperCase(), destX + destWidth / 2, destY + destHeight / 2);
            }
        }
    }

    drawArm(isPlayerRightArmActual) {
        ctx.save();
        const totalLegSegmentsHeight = this.thighHeight + this.lowerLegHeight;
        const torsoTopY = this.y + (this.height - this.torsoHeight - totalLegSegmentsHeight - this.shoeHeight);
        const baseShoulderY = torsoTopY + this.torsoHeight * 0.25;
        let shoulderXOffset;
        if (this.facingRight) {
            shoulderXOffset = isPlayerRightArmActual ? this.torsoWidth * 0.30 : this.torsoWidth * 0.70;
        } else {
            shoulderXOffset = isPlayerRightArmActual ? this.torsoWidth * 0.70 : this.torsoWidth * 0.30;
        }
        const shoulderX = this.x + (this.width - this.torsoWidth) / 2 + shoulderXOffset;
        const shoulderY = baseShoulderY;
        ctx.translate(shoulderX, shoulderY);
        let finalUpperArmAngle, finalForeArmAngle;
        
        // Lógica de pose para superpoder Tía Cote
        if (this.isCastingBeam) {
            // Brazos estirados hacia el frente
            finalUpperArmAngle = this.facingRight ? -Math.PI / 16 : Math.PI + Math.PI / 16;
            finalForeArmAngle = 0; // Brazo completamente estirado
        } else {
            const isPunchingThisArm = this.isPunching && this.attackVisualActive &&
                                     ((isPlayerRightArmActual && this.attackArm === 'right') || (!isPlayerRightArmActual && this.attackArm === 'left'));
            if (isPunchingThisArm) {
                finalUpperArmAngle = this.facingRight ? ARM_PUNCH_UPPER_EXTEND_ANGLE : Math.PI - ARM_PUNCH_UPPER_EXTEND_ANGLE;
                finalForeArmAngle = this.facingRight ? ARM_PUNCH_FOREARM_EXTEND_ANGLE : -ARM_PUNCH_FOREARM_EXTEND_ANGLE;
            } else if (this.isPunching && this.attackVisualActive) {
                finalUpperArmAngle = this.facingRight ? ARM_PUNCH_UPPER_RECOIL_ANGLE : Math.PI - ARM_PUNCH_UPPER_RECOIL_ANGLE;
                finalForeArmAngle = this.facingRight ? ARM_PUNCH_FOREARM_RECOIL_ANGLE : -ARM_PUNCH_FOREARM_RECOIL_ANGLE;
            } else {
                finalUpperArmAngle = this.facingRight ? ARM_GUARD_UPPER_ANGLE : Math.PI - ARM_GUARD_UPPER_ANGLE;
                finalForeArmAngle = this.facingRight ? ARM_GUARD_FOREARM_BEND : -ARM_GUARD_FOREARM_BEND;
                const isVisuallyBackArm = (this.facingRight && !isPlayerRightArmActual) || (!this.facingRight && isPlayerRightArmActual);
                if (isVisuallyBackArm) {
                    finalUpperArmAngle += this.facingRight ? 0.1 : -0.1;
                    finalForeArmAngle *= 0.9;
                }
            }
        }

        ctx.save();
        ctx.rotate(finalUpperArmAngle);
        this.drawPartWithTexture('arm_upper', 0, -this.armWidth / 2, this.upperArmLength, this.armWidth, false);
        ctx.translate(this.upperArmLength, 0);
        ctx.rotate(finalForeArmAngle);
        this.drawPartWithTexture('arm_fore', 0, -this.armWidth / 2, this.foreArmLength, this.armWidth, false);
        const gloveMainRadiusX = this.gloveSize / 2;
        const gloveMainRadiusY = this.gloveSize / 2.2;
        const gloveWristHeight = this.gloveSize * 0.35;
        const gloveWristWidth = this.armWidth * 1.3;
        const mainGloveAttachX = this.foreArmLength - this.armWidth * 0.5;
        const mainGloveCenterX = mainGloveAttachX + gloveMainRadiusX * 0.7;
        let directionalGloveTextureToUse = null;
        if (this.facingRight && this.gloveTextureImage_r && this.gloveTextureImage_r.complete && this.gloveTextureImage_r.width > 0) {
            directionalGloveTextureToUse = this.gloveTextureImage_r;
        } else if (!this.facingRight && this.gloveTextureImage_l && this.gloveTextureImage_l.complete && this.gloveTextureImage_l.width > 0) {
            directionalGloveTextureToUse = this.gloveTextureImage_l;
        }
        if (directionalGloveTextureToUse) {
            const gloveDrawX = this.foreArmLength - (this.armWidth * 0.8);
            const gloveDrawY = -this.gloveSize / 2;
            ctx.drawImage(directionalGloveTextureToUse, gloveDrawX, gloveDrawY, this.gloveSize, this.gloveSize);
        } else if (this.gloveTextureImage && this.gloveTextureImage.complete && this.gloveTextureImage.width > 0) {
            ctx.save();
            ctx.translate(this.foreArmLength - gloveWristWidth * 0.3 + gloveWristWidth / 2, 0);
            ctx.beginPath();
            ctx.rect(-gloveWristWidth / 2, -gloveWristHeight / 2, gloveWristWidth, gloveWristHeight);
            ctx.save();
            ctx.clip();
            ctx.drawImage(this.gloveTextureImage, 0, 0, this.gloveTextureImage.width, this.gloveTextureImage.height, -gloveWristWidth / 2, -gloveWristHeight / 2, gloveWristWidth, gloveWristHeight);
            ctx.restore();
            ctx.restore();
            ctx.beginPath();
            ctx.ellipse(mainGloveCenterX, 0, gloveMainRadiusX, gloveMainRadiusY, 0, 0, Math.PI * 2);
            ctx.save();
            ctx.clip();
            ctx.drawImage(this.gloveTextureImage, 0, 0, this.gloveTextureImage.width, this.gloveTextureImage.height, mainGloveCenterX - gloveMainRadiusX, -gloveMainRadiusY, gloveMainRadiusX * 2, gloveMainRadiusY * 2);
            ctx.restore();
        } else {
            ctx.fillStyle = BOXING_GLOVE_COLOR;
            ctx.fillRect(this.foreArmLength - gloveWristWidth * 0.3, -gloveWristHeight / 2, gloveWristWidth, gloveWristHeight);
            ctx.beginPath();
            ctx.ellipse(mainGloveCenterX, 0, gloveMainRadiusX, gloveMainRadiusY, 0, 0, Math.PI * 2);
            ctx.fill();
            const thumbRadius = gloveMainRadiusX * 0.5;
            const thumbLocalX = mainGloveCenterX - gloveMainRadiusX * 0.4;
            const thumbLocalY = -gloveMainRadiusY * 0.7;
            ctx.beginPath();
            ctx.ellipse(thumbLocalX, thumbLocalY, thumbRadius, thumbRadius * 0.85, -Math.PI / 8, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
        ctx.restore();
    }

    drawLeg(isFrontLeg) {
        ctx.save();
        const totalLegSegmentsHeight = this.thighHeight + this.lowerLegHeight;
        const hipXOffsetFactor = isFrontLeg ? 0.65 : 0.35;
        const hipXOffset = this.facingRight ? this.torsoWidth * hipXOffsetFactor : this.torsoWidth * (1 - hipXOffsetFactor);
        const hipYOffset = this.torsoHeight;
        const hipX = this.x + (this.width - this.torsoWidth) / 2 + hipXOffset;
        const hipY = this.y + (this.height - this.torsoHeight - totalLegSegmentsHeight - this.shoeHeight) + hipYOffset;
        ctx.translate(hipX, hipY);

        let angle;
        if (this.isKicking && this.attackVisualActive) {
            if (isFrontLeg) {
                angle = this.facingRight ? LEG_ANGLE_KICK_STRIKE : Math.PI - LEG_ANGLE_KICK_STRIKE;
            } else {
                angle = this.facingRight ? LEG_ANGLE_KICK_SUPPORT : Math.PI - LEG_ANGLE_KICK_SUPPORT;
            }
        } else {
            if (isFrontLeg) {
                angle = this.facingRight ? LEG_ANGLE_RESTING_FRONT : Math.PI - LEG_ANGLE_RESTING_FRONT;
            } else {
                angle = this.facingRight ? LEG_ANGLE_RESTING_BACK : Math.PI - LEG_ANGLE_RESTING_BACK;
            }
        }
        ctx.rotate(angle);
        this.drawPartWithTexture('thigh', 0, -this.legWidth / 2, this.thighHeight, this.legWidth, false);

        ctx.translate(this.thighHeight, 0);
        this.drawPartWithTexture('lower_leg', 0, -this.legWidth / 2, this.lowerLegHeight, this.legWidth, false);

        ctx.translate(this.lowerLegHeight - this.shoeHeight * 0.05, 0);

        if (this.shoeTextureImage && this.shoeTextureImage.complete && this.shoeTextureImage.width > 0) {
            const tex = this.shoeTextureImage;
            const sWidth = tex.width / 2;
            const sHeight = tex.height;
            const sx = 0;
            const sy = 0;

            ctx.drawImage(tex,
                                  sx, sy, sWidth, sHeight,
                                  -this.shoeWidth / 2, -this.shoeHeight / 2, this.shoeWidth, this.shoeHeight);
        } else {
            ctx.fillStyle = DEFAULT_SHOE_COLOR;
            ctx.fillRect(-this.shoeWidth / 2, -this.shoeHeight / 2, this.shoeWidth, this.shoeHeight);
        }
        ctx.restore();
    }

    drawPiranhaProjectiles() {
        this.activePiranhaProjectiles.forEach(p => {
            ctx.save();
            // Mover a la posición del proyectil para facilitar el dibujo
            ctx.translate(p.x, p.y);

            // Si mira a la izquierda, voltear todo el dibujo horizontalmente
            if (!p.direction) {
                ctx.translate(p.width, 0);
                ctx.scale(-1, 1);
            }

            // Cuerpo
            ctx.fillStyle = '#95a5a6'; // Color gris para el cuerpo
            ctx.beginPath();
            ctx.ellipse(p.width / 2, p.height / 2, p.width / 2, p.height / 2.5, 0, 0, Math.PI * 2);
            ctx.fill();

            // Cola
            ctx.fillStyle = '#7f8c8d'; // Gris más oscuro para la cola
            ctx.beginPath();
            ctx.moveTo(0, p.height / 2);
            ctx.lineTo(-p.width * 0.2, 0);
            ctx.lineTo(-p.width * 0.2, p.height);
            ctx.closePath();
            ctx.fill();

            // Ojo
            ctx.fillStyle = 'red';
            ctx.beginPath();
            ctx.arc(p.width * 0.75, p.height * 0.4, 2, 0, Math.PI * 2);
            ctx.fill();

            // Boca con dientes
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.moveTo(p.width, p.height / 2);
            ctx.lineTo(p.width * 0.8, p.height * 0.7);
            ctx.lineTo(p.width, p.height * 0.9);
            ctx.closePath();
            ctx.fill();

            ctx.restore();
        });
    }

    drawMoneyWads() {
        this.activeMoneyWads.forEach(wad => {
            ctx.save();
            ctx.translate(wad.x + wad.width / 2, wad.y + wad.height / 2);
            ctx.rotate(wad.rotation);

            if (this.moneyWadTextureImage && this.moneyWadTextureImage.complete) {
                ctx.drawImage(this.moneyWadTextureImage, -wad.width / 2, -wad.height / 2, wad.width, wad.height);
            } else {
                ctx.fillStyle = '#22c55e';
                ctx.fillRect(-wad.width / 2, -wad.height / 2, wad.width, wad.height);
                ctx.fillStyle = '#facc15';
                ctx.font = `bold ${wad.height * 0.8}px Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('$', 0, 0);
            }
            ctx.restore();
        });
    }
    
    drawCoins() {
        this.activeCoins.forEach(coin => {
            ctx.save();
            ctx.translate(coin.x, coin.y);
            
            // Cuerpo de la moneda
            ctx.fillStyle = '#facc15'; // Amarillo
            ctx.beginPath();
            ctx.arc(0, 0, coin.radius, 0, Math.PI * 2);
            ctx.fill();

            // Borde para dar efecto 3D
            ctx.strokeStyle = '#eab308'; // Amarillo más oscuro
            ctx.lineWidth = 2;
            ctx.stroke();
            
            ctx.restore();
        });
    }

    drawCalculatorProjectiles() {
        this.activeCalculators.forEach(calc => {
            ctx.save();
            ctx.translate(calc.x + calc.width / 2, calc.y + calc.height / 2);
            ctx.rotate(calc.rotation);

            if (this.calculatorProjectileTextureImage && this.calculatorProjectileTextureImage.complete) {
                ctx.drawImage(this.calculatorProjectileTextureImage, -calc.width / 2, -calc.height / 2, calc.width, calc.height);
            } else {
                // --- DIBUJO ESTILO ROBLOX / BLOQUE ---
                const w = calc.width;
                const h = calc.height;
                const depth = 8; // Profundidad para el efecto 3D

                ctx.lineWidth = 2;
                ctx.strokeStyle = '#2c3e50'; // Outline color

                // Cara lateral (sombra para dar profundidad)
                ctx.fillStyle = '#7f8c8d'; // Gris más oscuro
                ctx.beginPath();
                ctx.moveTo(-w / 2, -h / 2);
                ctx.lineTo(-w / 2 + depth, -h / 2 - depth);
                ctx.lineTo(w / 2 + depth, -h / 2 - depth);
                ctx.lineTo(w / 2, -h / 2);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Cara superior (sombra)
                ctx.beginPath();
                ctx.moveTo(w / 2, -h / 2);
                ctx.lineTo(w / 2 + depth, -h / 2 - depth);
                ctx.lineTo(w / 2 + depth, h / 2 - depth);
                ctx.lineTo(w / 2, h / 2);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Cuerpo principal frontal
                ctx.fillStyle = '#bdc3c7'; // Gris claro
                ctx.fillRect(-w / 2, -h / 2, w, h);
                ctx.strokeRect(-w / 2, -h / 2, w, h);

                // Pantalla
                ctx.fillStyle = '#2ecc71'; // Verde esmeralda
                const screenMarginX = w * 0.1;
                const screenMarginY = h * 0.1;
                const screenHeight = h * 0.25;
                ctx.fillRect(-w / 2 + screenMarginX, -h / 2 + screenMarginY, w - screenMarginX * 2, screenHeight);
                ctx.strokeRect(-w / 2 + screenMarginX, -h / 2 + screenMarginY, w - screenMarginX * 2, screenHeight);
                
                // Texto en pantalla (opcional, para más detalle)
                ctx.fillStyle = 'black';
                ctx.font = `bold ${screenHeight * 0.6}px monospace`;
                ctx.textAlign = 'right';
                ctx.textBaseline = 'middle';
                ctx.fillText('80085', w/2 - screenMarginX - 4, -h/2 + screenMarginY + screenHeight/2);


                // Botones
                ctx.fillStyle = '#7f8c8d'; // Mismo gris oscuro que la sombra
                const buttonSize = w * 0.18;
                const buttonStartY = -h/2 + screenMarginY + screenHeight + h * 0.1;
                for (let row = 0; row < 2; row++) {
                    for (let col = 0; col < 3; col++) {
                        const x = -w/2 + w*0.2 + col * (buttonSize + w*0.1);
                        const y = buttonStartY + row * (buttonSize + h*0.08);
                        ctx.fillRect(x, y, buttonSize, buttonSize);
                        ctx.strokeRect(x, y, buttonSize, buttonSize);
                    }
                }
            }
            ctx.restore();
        });
    }

    drawPapers() {
        this.activePapers.forEach(paper => {
            ctx.save();
            ctx.translate(paper.x + paper.width / 2, paper.y + paper.height / 2);
            ctx.rotate(paper.rotation);

            if (paper.isPowerPoint) {
                // Dibuja el logo de PowerPoint
                const w = paper.width * 1.5; // Hacerlo un poco más grande
                const h = paper.height * 1.5;
                ctx.fillStyle = '#D04423'; // Color naranja-rojizo de PowerPoint
                ctx.fillRect(-w / 2, -h / 2, w, h);
                
                // Círculo interior
                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.arc(0, 0, w * 0.35, 0, Math.PI * 2);
                ctx.fill();

                // Letra 'P'
                ctx.fillStyle = '#D04423';
                ctx.font = `bold ${h * 0.5}px Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('P', 0, h * 0.05);

            } else {
                // Dibuja un papel normal
                ctx.fillStyle = 'white';
                ctx.fillRect(-paper.width / 2, -paper.height / 2, paper.width, paper.height);
                ctx.strokeStyle = '#cccccc';
                ctx.lineWidth = 1;
                for (let i = 1; i < 5; i++) {
                    const lineY = -paper.height / 2 + (paper.height / 5) * i;
                    ctx.beginPath();
                    ctx.moveTo(-paper.width / 2, lineY);
                    ctx.lineTo(paper.width / 2, lineY);
                    ctx.stroke();
                }
            }
            ctx.restore();
        });
    }

    drawKisses() {
        this.activeKisses.forEach(kiss => {
            ctx.save();
            ctx.translate(kiss.x, kiss.y);
            
            const w = kiss.width;
            const h = kiss.height;
            const pixelSize = w / 11; // 11 "pixels" across based on image

            // Main color
            ctx.fillStyle = '#d90429'; // Strong red
            
            const lipMap = [
                "   xxx   ",
                "  xxxxx  ",
                " xxxxxxx ",
                "xxxxxxxxx",
                "xxxxxxxxx",
                " xxxxxxx ",
                "  xxxxx  ",
                "   xxx   "
            ];

            ctx.fillStyle = '#ef233c'; // Brighter red for main part
            for(let r = 0; r < lipMap.length; r++) {
                for (let c = 0; c < lipMap[r].length; c++) {
                    if(lipMap[r][c] === 'x') {
                        ctx.fillRect(c * pixelSize, r * pixelSize, pixelSize, pixelSize);
                    }
                }
            }
            
            // Darker line for separation
            ctx.fillStyle = '#8d0801'; // Darker red
            const lineY = 4 * pixelSize;
            ctx.fillRect(0, lineY, w, pixelSize);

            ctx.restore();
        });
    }

    drawHearts() {
        this.activeHearts.forEach(heart => {
            ctx.save();
            ctx.translate(heart.x, heart.y);
            ctx.fillStyle = '#ff69b4'; // HotPink
            ctx.beginPath();
            const w = heart.width;
            const h = heart.height;
            ctx.moveTo(w / 2, h / 4);
            ctx.quadraticCurveTo(w / 2, 0, w / 4, 0);
            ctx.quadraticCurveTo(0, 0, 0, h / 4);
            ctx.quadraticCurveTo(0, h / 2, w / 2, h);
            ctx.quadraticCurveTo(w, h / 2, w, h / 4);
            ctx.quadraticCurveTo(w, 0, (w / 4) * 3, 0);
            ctx.quadraticCurveTo(w/2, 0, w/2, h/4);
            ctx.fill();
            ctx.restore();
        });
    }
    
    // Método para dibujar el haz de luz de Tía Cote
    drawTiaCoteBeam() {
        if (!this.isCastingBeam) return;

        const beamProgress = 1 - (this.beamTimer / TIA_COTE_BEAM_DURATION);
        const currentAlpha = 0.8 * Math.sin(beamProgress * Math.PI); // Efecto de fade-in y fade-out

        ctx.save();
        
        const beamY = this.y + this.height * 0.3;
        const beamStartX = this.facingRight ? this.x + this.width / 2 : 0;
        const beamTotalWidth = this.facingRight ? CANVAS_WIDTH - beamStartX : this.x + this.width / 2;

        // Gradiente para el rayo
        const gradient = ctx.createLinearGradient(beamStartX, beamY, beamStartX, beamY + TIA_COTE_BEAM_WIDTH);
        gradient.addColorStop(0, `rgba(255, 255, 224, ${currentAlpha * 0.5})`); // Amarillo muy claro, casi blanco
        gradient.addColorStop(0.5, `rgba(253, 224, 71, ${currentAlpha})`); // Amarillo dorado
        gradient.addColorStop(1, `rgba(255, 255, 224, ${currentAlpha * 0.5})`);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(beamStartX, beamY, beamTotalWidth, TIA_COTE_BEAM_WIDTH);

        // Partículas de brillo dentro del rayo
        for (let i = 0; i < 20; i++) {
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.9 * currentAlpha})`;
            const particleX = beamStartX + Math.random() * beamTotalWidth;
            const particleY = beamY + Math.random() * TIA_COTE_BEAM_WIDTH;
            const particleSize = Math.random() * 3 + 1;
            ctx.fillRect(particleX, particleY, particleSize, particleSize);
        }

        ctx.restore();
    }


    drawZanjasCrack() {
        if (!this.isCastingCrack) return;

        const groundY = CANVAS_HEIGHT - 10;
        const halfLife = ZANJAS_CRACK_LIFESPAN / 2;

        // Progreso triangular simple: 0 -> 1 -> 0
        let progress = 0;
        if (this.crackTimer > halfLife) {
            progress = (ZANJAS_CRACK_LIFESPAN - this.crackTimer) / halfLife;
        } else {
            progress = this.crackTimer / halfLife;
        }

        const currentCrackWidth = ZANJAS_CRACK_WIDTH * progress;
        const currentCrackDepth = ZANJAS_CRACK_MAX_HEIGHT * progress;

        if (currentCrackWidth <= 2) return;

        ctx.save();
        // Abismo negro
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(this.crackCenterX - currentCrackWidth / 2, groundY);
        ctx.lineTo(this.crackCenterX + currentCrackWidth / 2, groundY);
        ctx.lineTo(this.crackCenterX, groundY + currentCrackDepth);
        ctx.closePath();
        ctx.fill();

        // Bordes irregulares
        ctx.strokeStyle = '#4a2a0a';
        ctx.lineWidth = 3;
        for (let s = -1; s <= 1; s += 2) {
            ctx.beginPath();
            ctx.moveTo(this.crackCenterX + (s * currentCrackWidth / 2), groundY);
            for (let i = 0; i <= 10; i++) {
                const p = i / 10;
                const x = this.crackCenterX + (s * (currentCrackWidth / 2) * (1 - p));
                const y = groundY + (Math.random() - 0.5) * 8 * progress;
                ctx.lineTo(x, y);
            }
            ctx.stroke();
        }
        ctx.restore();
    }

    draw() {
        if(this.isInvisible) return; // No dibujar si es invisible
        ctx.save();

         if (this.isDashing) {
            this.trail.forEach((pos, index) => {
                ctx.globalAlpha = (index / this.trail.length) * 0.5;
                 this.drawPlayerModel(pos.x, pos.y);
            });
            ctx.globalAlpha = 1;
        }
        this.drawPlayerModel(this.x, this.y);

        this.drawPiranhaProjectiles();
        this.drawMoneyWads();
        this.drawCoins();
        this.drawCalculatorProjectiles();
        this.drawPapers();
        this.drawKisses();
        this.drawHearts();
        this.drawTiaCoteBeam();
        
        if (this.isCastingCrack) {
            this.drawZanjasCrack();
        }
        
        if (this.isConfused) {
            ctx.font = `bold 24px 'Comic Sans MS'`;
            ctx.fillStyle = 'yellow';
            ctx.textAlign = 'center';
            ctx.fillText('???', this.x + this.width / 2, this.y - 20);
        } else if (this.isStunned) {
            ctx.font = `bold 24px 'Comic Sans MS'`;
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText('!!!', this.x + this.width / 2, this.y - 20);
        }

        if (this.isPerformingSuperAttackAnimation && this.attackVisualActive && this.superEffectTextureImage && this.superEffectTextureImage.complete && this.name !== "Piraña") {
            const effectWidth = this.width * 1.5;
            const effectHeight = this.height * 1.5;
            const effectX = this.x + (this.width - effectWidth) / 2;
            const effectY = this.y + (this.height - effectHeight) / 2;
            ctx.globalAlpha = 0.7;
            ctx.drawImage(this.superEffectTextureImage, effectX, effectY, effectWidth, effectHeight);
            ctx.globalAlpha = 1.0;
        }
        ctx.restore();
    }

     drawPlayerModel(x, y) {
        if (this.isSwallowed) {
            return; // No dibujar si está tragado
        }
        const originalX = this.x;
        const originalY = this.y;
        this.x = x;
        this.y = y;

        if (this.showBlurred) {
            ctx.filter = 'blur(4px)';
        } else if ((this.isPerformingSuperAttackAnimation || this.isCastingBeam) && this.attackVisualActive) {
            ctx.filter = 'brightness(1.75) saturate(2.5)';
        }

        const totalLegSegmentsHeight = this.thighHeight + this.lowerLegHeight;
        const torsoGlobalY = this.y + (this.height - this.torsoHeight - totalLegSegmentsHeight - this.shoeHeight);
        const torsoGlobalX = this.x + (this.width - this.torsoWidth) / 2;
        const headGlobalX = this.x + (this.width - this.headSize) / 2;
        const headGlobalY = torsoGlobalY - this.headSize;
        const visuallyBackArmIsRight = !this.facingRight;
        const visuallyBackLegIsFront = !this.facingRight;
        this.drawLeg(visuallyBackLegIsFront);
        this.drawLeg(!visuallyBackLegIsFront);
        if (this.facingRight) {
            this.drawArm(false);
            this.drawPartWithTexture('torso', torsoGlobalX, torsoGlobalY, this.torsoWidth, this.torsoHeight, !this.facingRight);
            if (this.name === 'Matthei Bolt' && this.isDashing) {
                this.drawVest(torsoGlobalX, torsoGlobalY);
            }
            this.drawPartWithTexture('head', headGlobalX, headGlobalY, this.headSize, this.headSize, !this.facingRight);
            this.drawArm(true);
        } else {
            this.drawArm(true);
            this.drawPartWithTexture('torso', torsoGlobalX, torsoGlobalY, this.torsoWidth, this.torsoHeight, !this.facingRight);
            if (this.name === 'Matthei Bolt' && this.isDashing) {
                this.drawVest(torsoGlobalX, torsoGlobalY);
            }
            this.drawPartWithTexture('head', headGlobalX, headGlobalY, this.headSize, this.headSize, !this.facingRight);
            this.drawArm(false);
        }

        ctx.filter = 'none';
        this.x = originalX;
        this.y = originalY;
    }

    drawVest(torsoX, torsoY) {
        ctx.save();
        if (!this.facingRight) {
             ctx.translate(this.x + this.width/2, 0);
             ctx.scale(-1,1);
             ctx.translate(-(this.x + this.width/2), 0);
        }

        if (this.yellowVestTextureImage && this.yellowVestTextureImage.complete && this.yellowVestTextureImage.width > 0) {
                ctx.drawImage(this.yellowVestTextureImage, torsoX, torsoY, this.torsoWidth, this.torsoHeight);
        } else {
            // Fallback si la textura no carga
            ctx.fillStyle = '#eab308'; // Amarillo-600 de Tailwind
            ctx.fillRect(torsoX, torsoY, this.torsoWidth, this.torsoHeight);

            // Bandas grises reflectantes
            const stripeHeight = this.torsoHeight / 6;
            ctx.fillStyle = '#a1a1aa'; // Zinc-400
            
            const stripe1Y = torsoY + this.torsoHeight * 0.4 - stripeHeight / 2;
            ctx.fillRect(torsoX, stripe1Y, this.torsoWidth, stripeHeight);
            
            const stripe2Y = torsoY + this.torsoHeight * 0.65 - stripeHeight / 2;
            ctx.fillRect(torsoX, stripe2Y, this.torsoWidth, stripeHeight);
        }
        ctx.restore();
    }


    updateAI() {
        if (this.isConfused) {
            this.confusionTimer--;
            this.confusionBlinkTimer--;
            if(this.confusionTimer <= 0) {
                this.isConfused = false;
                this.showBlurred = false;
            }
            if(this.confusionBlinkTimer <= 0) {
                this.showBlurred = !this.showBlurred;
                new Audio('audio/pouf-bomb.wav').play().catch(e => console.error("Error playing sound:", e));
                this.confusionBlinkTimer = 15; // Blink every 15 frames
            }
            return; // AI is confused, skip normal logic
         }

         if (this.isDashing || this.isSwallowed || this.isCastingCrack || this.isStunned || this.isCastingBeam) {
            return;
         }
        if (Date.now() - this.lastAIDecisionTime > AI_ACTION_INTERVAL) {
            this.lastAIDecisionTime = Date.now();
            const opponent = players.find(p => p !== this);
            if (!opponent || opponent.isInvisible) { // No hacer nada si el oponente es invisible
                this.currentAction = 'stand';
                return;
            }
            const distanceToOpponent = Math.abs((this.x + this.width / 2) - (opponent.x + opponent.width / 2)) - (this.width/2 + opponent.width/2);
            const opponentIsToTheRight = (opponent.x + opponent.width / 2) > (this.x + this.width / 2);
            if (distanceToOpponent < Math.max(this.punchRange, this.kickRange) * 1.5) {
                this.facingRight = opponentIsToTheRight;
            }
            const canAttack = !(this.isPunching || this.isKicking) && (Date.now() - this.lastAttackTime > this.attackCooldown);
            let decidedToAttack = false;
            let attackType = 'punch';
            if (this.facingRight === opponentIsToTheRight) {
                if (distanceToOpponent < this.kickRange && Math.random() < AI_ATTACK_CHANCE_IN_RANGE) {
                    decidedToAttack = true;
                    if (Math.random() < AI_KICK_CHANCE) {
                        attackType = 'kick';
                    } else if (distanceToOpponent >= this.punchRange) {
                        attackType = 'kick';
                    } else {
                        attackType = 'punch';
                    }
                } else if (distanceToOpponent < this.punchRange && Math.random() < AI_ATTACK_CHANCE_IN_RANGE) {
                    decidedToAttack = true;
                    attackType = 'punch';
                }
            }
            if (canAttack && decidedToAttack) {
                if (this.isSuperCharged && Math.random() < 0.8) {
                    if (attackType === 'kick') this.kick(); else this.punch();
                } else if (attackType === 'kick') {
                    this.kick();
                } else {
                    this.punch();
                }
                this.currentAction = 'attack';
            } else {
                if (Math.random() < AI_MOVE_CHANCE) {
                    const randomMove = Math.random();
                    if (distanceToOpponent > this.punchRange * 0.5) {
                        this.currentAction = opponentIsToTheRight ? 'moveRight' : 'moveLeft';
                        this.facingRight = opponentIsToTheRight;
                    } else if (randomMove < 0.3) {
                        this.currentAction = opponentIsToTheRight ? 'moveLeft' : 'moveRight';
                    } else {
                        this.currentAction = 'stand';
                    }
                    if (Math.random() < AI_JUMP_CHANCE && !this.isJumping) this.jump();
                } else {
                    this.currentAction = 'stand';
                }
            }
        }
        this.velocityX = 0;
        if (this.currentAction === 'moveLeft') this.velocityX = -this.speed;
        else if (this.currentAction === 'moveRight') this.velocityX = this.speed;
    }

    updatePiranhaProjectiles(opponent) {
        for (let i = this.activePiranhaProjectiles.length - 1; i >= 0; i--) {
            const p = this.activePiranhaProjectiles[i];
            p.x += p.velocityX * (p.direction ? 1 : -1);
            p.lifespan--;

            if (p.lifespan <= 0 || p.x > CANVAS_WIDTH || p.x + p.width < 0) {
                this.activePiranhaProjectiles.splice(i, 1);
                continue;
            }

            const opponentBox = { x: opponent.x, y: opponent.y, width: opponent.width, height: opponent.height };
            const projectileBox = { x: p.x, y: p.y, width: p.width, height: p.height };

            if (
                !opponent.isSwallowed && !opponent.isStunned &&
                projectileBox.x < opponentBox.x + opponentBox.width &&
                projectileBox.x + projectileBox.width > opponentBox.x &&
                projectileBox.y < opponentBox.y + opponentBox.height &&
                projectileBox.y + projectileBox.height > opponentBox.y
            ) {
                opponent.takeDamage(p.damage, p.direction);
                activeHitEffects.push({ text: "¡ÑAM!", x: p.x, y: p.y, color: "#ff6347", alpha: 1.0, size: 20, rotation: 0, lifetime: HIT_EFFECT_LIFETIME / 2 });
                this.activePiranhaProjectiles.splice(i, 1);
            }
        }
    }

    updateMoneyWads(opponent) {
        for (let i = this.activeMoneyWads.length - 1; i >= 0; i--) {
            const wad = this.activeMoneyWads[i];
            wad.velocityY += GRAVITY * 0.5;
            wad.y += wad.velocityY;
            wad.x += wad.velocityX;
            wad.rotation += wad.rotationSpeed;

            if (wad.y > CANVAS_HEIGHT) {
                this.activeMoneyWads.splice(i, 1);
                continue;
            }

            const opponentBox = { x: opponent.x, y: opponent.y, width: opponent.width, height: opponent.height };
            const wadBox = { x: wad.x, y: wad.y, width: wad.width, height: wad.height };

            if (
                !opponent.isSwallowed && !opponent.isStunned &&
                wadBox.x < opponentBox.x + opponentBox.width &&
                wadBox.x + wadBox.width > opponentBox.x &&
                wadBox.y < opponentBox.y + opponentBox.height &&
                wadBox.y + wadBox.height > opponentBox.y
            ) {
                opponent.takeDamage(wad.damage, wad.x > opponent.x + opponent.width / 2);
                activeHitEffects.push({ text: "$$$", x: wad.x, y: wad.y, color: "#22c55e", alpha: 1.0, size: 30, rotation: 0, lifetime: HIT_EFFECT_LIFETIME });
                this.activeMoneyWads.splice(i, 1);
            }
        }
    }
    
    updateCoins(opponent) {
        for (let i = this.activeCoins.length - 1; i >= 0; i--) {
            const coin = this.activeCoins[i];
            coin.velocityY += GRAVITY * 0.6; // Coins are a bit heavier
            coin.y += coin.velocityY;
            
            if (coin.y > CANVAS_HEIGHT) {
                this.activeCoins.splice(i, 1);
                continue;
            }

            const opponentBox = { x: opponent.x, y: opponent.y, width: opponent.width, height: opponent.height };
            const coinBox = { x: coin.x - coin.radius, y: coin.y - coin.radius, width: coin.radius * 2, height: coin.radius * 2 };
            
            if (
                !opponent.isSwallowed && !opponent.isStunned &&
                coinBox.x < opponentBox.x + opponentBox.width &&
                coinBox.x + coinBox.width > opponentBox.x &&
                coinBox.y < opponentBox.y + opponentBox.height &&
                coinBox.y + coinBox.height > opponentBox.y
            ) {
                opponent.takeDamage(COIN_RAIN_DAMAGE, coin.x > opponent.x + opponent.width / 2);
                activeHitEffects.push({ text: "$", x: coin.x, y: coin.y, color: "#facc15", alpha: 1.0, size: 20, rotation: 0, lifetime: HIT_EFFECT_LIFETIME });
                this.activeCoins.splice(i, 1);
            }
        }
    }

    updateCalculatorProjectiles(opponent) {
        for (let i = this.activeCalculators.length - 1; i >= 0; i--) {
            const calc = this.activeCalculators[i];
            calc.x += calc.velocityX;
            calc.y += calc.velocityY;
            calc.velocityY += GRAVITY * 0.4; // Las calculadoras son pesadas
            calc.rotation += calc.rotationSpeed;
            calc.lifespan--;

            if (calc.lifespan <= 0 || calc.y > CANVAS_HEIGHT) {
                this.activeCalculators.splice(i, 1);
                continue;
            }

            const opponentBox = { x: opponent.x, y: opponent.y, width: opponent.width, height: opponent.height };
            const calcBox = { x: calc.x, y: calc.y, width: calc.width, height: calc.height };

            if (
                !opponent.isSwallowed && !opponent.isStunned &&
                calcBox.x < opponentBox.x + opponentBox.width &&
                calcBox.x + calcBox.width > opponentBox.x &&
                calcBox.y < opponentBox.y + opponentBox.height &&
                calcBox.y + calcBox.height > opponentBox.y
            ) {
                opponent.takeDamage(CALCULATOR_PROJECTILE_DAMAGE, calc.velocityX > 0);
                activeHitEffects.push({ text: "ERROR", x: calc.x, y: calc.y, color: "#e53e3e", alpha: 1.0, size: 25, rotation: 0, lifetime: HIT_EFFECT_LIFETIME });
                this.activeCalculators.splice(i, 1);
            }
        }
    }

    updatePapers(opponent) {
        for (let i = this.activePapers.length - 1; i >= 0; i--) {
            const paper = this.activePapers[i];
            paper.velocityY += GRAVITY * 0.3;
            paper.y += paper.velocityY;
            paper.x += paper.velocityX;
            paper.rotation += paper.rotationSpeed;

            if (paper.y > CANVAS_HEIGHT) {
                this.activePapers.splice(i, 1);
                continue;
            }

            const opponentBox = { x: opponent.x, y: opponent.y, width: opponent.width, height: opponent.height };
            const paperBox = { x: paper.x, y: paper.y, width: paper.width, height: paper.height };
            
            if (
                !opponent.isSwallowed && !opponent.isStunned &&
                paperBox.x < opponentBox.x + opponentBox.width &&
                paperBox.x + paperBox.width > opponentBox.x &&
                paperBox.y < opponentBox.y + opponentBox.height &&
                paperBox.y + paperBox.height > opponentBox.y
            ) {
                opponent.takeDamage(PAPELUCHO_PAPER_DAMAGE, this.facingRight);
                opponent.isStunned = true;
                opponent.stunTimer = PAPELUCHO_STUN_DURATION;
                this.activePapers.splice(i, 1);
            }
        }
    }

    updateKisses(opponent) {
        for (let i = this.activeKisses.length - 1; i >= 0; i--) {
            const kiss = this.activeKisses[i];
            kiss.x += kiss.velocityX * (kiss.direction ? 1 : -1);
            kiss.lifespan--;

            if (kiss.lifespan <= 0 || kiss.x > CANVAS_WIDTH || kiss.x + kiss.width < 0) {
                this.activeKisses.splice(i, 1);
                continue;
            }

            const opponentBox = { x: opponent.x, y: opponent.y, width: opponent.width, height: opponent.height };
            const kissBox = { x: kiss.x, y: kiss.y, width: kiss.width, height: kiss.height };

            if (
                !opponent.isSwallowed && !opponent.isStunned &&
                kissBox.x < opponentBox.x + opponentBox.width &&
                kissBox.x + kissBox.width > opponentBox.x &&
                kissBox.y < opponentBox.y + opponentBox.height &&
                kissBox.y + kissBox.height > opponentBox.y
            ) {
                opponent.takeDamage(kiss.damage, kiss.direction);
                activeHitEffects.push({ text: "♥", x: kiss.x, y: kiss.y, color: "#ff69b4", alpha: 1.0, size: 30, rotation: 0, lifetime: HIT_EFFECT_LIFETIME });
                this.activeKisses.splice(i, 1);
            }
        }
    }

    updateHearts(opponent) {
        for (let i = this.activeHearts.length - 1; i >= 0; i--) {
            const heart = this.activeHearts[i];
            heart.x += heart.velocityX;
            heart.y += heart.velocityY;
            heart.lifespan--;

            if (heart.lifespan <= 0 || heart.x > CANVAS_WIDTH || heart.x + heart.width < 0) {
                this.activeHearts.splice(i, 1);
                continue;
            }

            const opponentBox = { x: opponent.x, y: opponent.y, width: opponent.width, height: opponent.height };
            const heartBox = { x: heart.x, y: heart.y, width: heart.width, height: heart.height };

            if (
                !opponent.isSwallowed && !opponent.isStunned &&
                heartBox.x < opponentBox.x + opponentBox.width &&
                heartBox.x + heartBox.width > opponentBox.x &&
                heartBox.y < opponentBox.y + opponentBox.height &&
                heartBox.y + heartBox.height > opponentBox.y
            ) {
                opponent.takeDamage(heart.damage, this.facingRight);
                activeHitEffects.push({ text: "♥", x: heart.x, y: heart.y, color: "#e879f9", alpha: 1.0, size: 25, rotation: 0, lifetime: HIT_EFFECT_LIFETIME });
                this.activeHearts.splice(i, 1);
            }
        }
    }
    
    // Método para dibujar el haz de luz de Tía Cote
    drawTiaCoteBeam() {
        if (!this.isCastingBeam) return;

        const beamProgress = 1 - (this.beamTimer / TIA_COTE_BEAM_DURATION);
        const currentAlpha = 0.8 * Math.sin(beamProgress * Math.PI); // Efecto de fade-in y fade-out

        ctx.save();
        
        const beamY = this.y + this.height * 0.3;
        const beamStartX = this.facingRight ? this.x + this.width / 2 : 0;
        const beamTotalWidth = this.facingRight ? CANVAS_WIDTH - beamStartX : this.x + this.width / 2;

        // Gradiente para el rayo
        const gradient = ctx.createLinearGradient(beamStartX, beamY, beamStartX, beamY + TIA_COTE_BEAM_WIDTH);
        gradient.addColorStop(0, `rgba(255, 255, 224, ${currentAlpha * 0.5})`); // Amarillo muy claro, casi blanco
        gradient.addColorStop(0.5, `rgba(253, 224, 71, ${currentAlpha})`); // Amarillo dorado
        gradient.addColorStop(1, `rgba(255, 255, 224, ${currentAlpha * 0.5})`);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(beamStartX, beamY, beamTotalWidth, TIA_COTE_BEAM_WIDTH);

        // Partículas de brillo dentro del rayo
        for (let i = 0; i < 20; i++) {
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.9 * currentAlpha})`;
            const particleX = beamStartX + Math.random() * beamTotalWidth;
            const particleY = beamY + Math.random() * TIA_COTE_BEAM_WIDTH;
            const particleSize = Math.random() * 3 + 1;
            ctx.fillRect(particleX, particleY, particleSize, particleSize);
        }

        ctx.restore();
    }


    drawZanjasCrack() {
        if (!this.isCastingCrack) return;

        const groundY = CANVAS_HEIGHT - 10;
        const halfLife = ZANJAS_CRACK_LIFESPAN / 2;

        // Progreso triangular simple: 0 -> 1 -> 0
        let progress = 0;
        if (this.crackTimer > halfLife) {
            progress = (ZANJAS_CRACK_LIFESPAN - this.crackTimer) / halfLife;
        } else {
            progress = this.crackTimer / halfLife;
        }

        const currentCrackWidth = ZANJAS_CRACK_WIDTH * progress;
        const currentCrackDepth = ZANJAS_CRACK_MAX_HEIGHT * progress;

        if (currentCrackWidth <= 2) return;

        ctx.save();
        // Abismo negro
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(this.crackCenterX - currentCrackWidth / 2, groundY);
        ctx.lineTo(this.crackCenterX + currentCrackWidth / 2, groundY);
        ctx.lineTo(this.crackCenterX, groundY + currentCrackDepth);
        ctx.closePath();
        ctx.fill();

        // Bordes irregulares
        ctx.strokeStyle = '#4a2a0a';
        ctx.lineWidth = 3;
        for (let s = -1; s <= 1; s += 2) {
            ctx.beginPath();
            ctx.moveTo(this.crackCenterX + (s * currentCrackWidth / 2), groundY);
            for (let i = 0; i <= 10; i++) {
                const p = i / 10;
                const x = this.crackCenterX + (s * (currentCrackWidth / 2) * (1 - p));
                const y = groundY + (Math.random() - 0.5) * 8 * progress;
                ctx.lineTo(x, y);
            }
            ctx.stroke();
        }
        ctx.restore();
    }

    draw() {
        if(this.isInvisible) return; // No dibujar si es invisible
        ctx.save();

         if (this.isDashing) {
            this.trail.forEach((pos, index) => {
                ctx.globalAlpha = (index / this.trail.length) * 0.5;
                 this.drawPlayerModel(pos.x, pos.y);
            });
            ctx.globalAlpha = 1;
        }
        this.drawPlayerModel(this.x, this.y);

        this.drawPiranhaProjectiles();
        this.drawMoneyWads();
        this.drawCoins();
        this.drawCalculatorProjectiles();
        this.drawPapers();
        this.drawKisses();
        this.drawHearts();
        this.drawTiaCoteBeam();
        
        if (this.isCastingCrack) {
            this.drawZanjasCrack();
        }
        
        if (this.isConfused) {
            ctx.font = `bold 24px 'Comic Sans MS'`;
            ctx.fillStyle = 'yellow';
            ctx.textAlign = 'center';
            ctx.fillText('???', this.x + this.width / 2, this.y - 20);
        } else if (this.isStunned) {
            ctx.font = `bold 24px 'Comic Sans MS'`;
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText('!!!', this.x + this.width / 2, this.y - 20);
        }

        if (this.isPerformingSuperAttackAnimation && this.attackVisualActive && this.superEffectTextureImage && this.superEffectTextureImage.complete && this.name !== "Piraña") {
            const effectWidth = this.width * 1.5;
            const effectHeight = this.height * 1.5;
            const effectX = this.x + (this.width - effectWidth) / 2;
            const effectY = this.y + (this.height - effectHeight) / 2;
            ctx.globalAlpha = 0.7;
            ctx.drawImage(this.superEffectTextureImage, effectX, effectY, effectWidth, effectHeight);
            ctx.globalAlpha = 1.0;
        }
        ctx.restore();
    }

     drawPlayerModel(x, y) {
        if (this.isSwallowed) {
            return; // No dibujar si está tragado
        }
        const originalX = this.x;
        const originalY = this.y;
        this.x = x;
        this.y = y;

        if (this.showBlurred) {
            ctx.filter = 'blur(4px)';
        } else if ((this.isPerformingSuperAttackAnimation || this.isCastingBeam) && this.attackVisualActive) {
            ctx.filter = 'brightness(1.75) saturate(2.5)';
        }

        const totalLegSegmentsHeight = this.thighHeight + this.lowerLegHeight;
        const torsoGlobalY = this.y + (this.height - this.torsoHeight - totalLegSegmentsHeight - this.shoeHeight);
        const torsoGlobalX = this.x + (this.width - this.torsoWidth) / 2;
        const headGlobalX = this.x + (this.width - this.headSize) / 2;
        const headGlobalY = torsoGlobalY - this.headSize;
        const visuallyBackArmIsRight = !this.facingRight;
        const visuallyBackLegIsFront = !this.facingRight;
        this.drawLeg(visuallyBackLegIsFront);
        this.drawLeg(!visuallyBackLegIsFront);
        if (this.facingRight) {
            this.drawArm(false);
            this.drawPartWithTexture('torso', torsoGlobalX, torsoGlobalY, this.torsoWidth, this.torsoHeight, !this.facingRight);
            if (this.name === 'Matthei Bolt' && this.isDashing) {
                this.drawVest(torsoGlobalX, torsoGlobalY);
            }
            this.drawPartWithTexture('head', headGlobalX, headGlobalY, this.headSize, this.headSize, !this.facingRight);
            this.drawArm(true);
        } else {
            this.drawArm(true);
            this.drawPartWithTexture('torso', torsoGlobalX, torsoGlobalY, this.torsoWidth, this.torsoHeight, !this.facingRight);
            if (this.name === 'Matthei Bolt' && this.isDashing) {
                this.drawVest(torsoGlobalX, torsoGlobalY);
            }
            this.drawPartWithTexture('head', headGlobalX, headGlobalY, this.headSize, this.headSize, !this.facingRight);
            this.drawArm(false);
        }

        ctx.filter = 'none';
        this.x = originalX;
        this.y = originalY;
    }

    drawVest(torsoX, torsoY) {
        ctx.save();
        if (!this.facingRight) {
             ctx.translate(this.x + this.width/2, 0);
             ctx.scale(-1,1);
             ctx.translate(-(this.x + this.width/2), 0);
        }

        if (this.yellowVestTextureImage && this.yellowVestTextureImage.complete && this.yellowVestTextureImage.width > 0) {
                ctx.drawImage(this.yellowVestTextureImage, torsoX, torsoY, this.torsoWidth, this.torsoHeight);
        } else {
            // Fallback si la textura no carga
            ctx.fillStyle = '#eab308'; // Amarillo-600 de Tailwind
            ctx.fillRect(torsoX, torsoY, this.torsoWidth, this.torsoHeight);

            // Bandas grises reflectantes
            const stripeHeight = this.torsoHeight / 6;
            ctx.fillStyle = '#a1a1aa'; // Zinc-400
            
            const stripe1Y = torsoY + this.torsoHeight * 0.4 - stripeHeight / 2;
            ctx.fillRect(torsoX, stripe1Y, this.torsoWidth, stripeHeight);
            
            const stripe2Y = torsoY + this.torsoHeight * 0.65 - stripeHeight / 2;
            ctx.fillRect(torsoX, stripe2Y, this.torsoWidth, stripeHeight);
        }
        ctx.restore();
    }


    updateAI() {
        if (this.isConfused) {
            this.confusionTimer--;
            this.confusionBlinkTimer--;
            if(this.confusionTimer <= 0) {
                this.isConfused = false;
                this.showBlurred = false;
            }
            if(this.confusionBlinkTimer <= 0) {
                this.showBlurred = !this.showBlurred;
                new Audio('audio/pouf-bomb.wav').play().catch(e => console.error("Error playing sound:", e));
                this.confusionBlinkTimer = 15; // Blink every 15 frames
            }
            return; // AI is confused, skip normal logic
         }

         if (this.isDashing || this.isSwallowed || this.isCastingCrack || this.isStunned || this.isCastingBeam) {
            return;
         }
        if (Date.now() - this.lastAIDecisionTime > AI_ACTION_INTERVAL) {
            this.lastAIDecisionTime = Date.now();
            const opponent = players.find(p => p !== this);
            if (!opponent || opponent.isInvisible) { // No hacer nada si el oponente es invisible
                this.currentAction = 'stand';
                return;
            }
            const distanceToOpponent = Math.abs((this.x + this.width / 2) - (opponent.x + opponent.width / 2)) - (this.width/2 + opponent.width/2);
            const opponentIsToTheRight = (opponent.x + opponent.width / 2) > (this.x + this.width / 2);
            if (distanceToOpponent < Math.max(this.punchRange, this.kickRange) * 1.5) {
                this.facingRight = opponentIsToTheRight;
            }
            const canAttack = !(this.isPunching || this.isKicking) && (Date.now() - this.lastAttackTime > this.attackCooldown);
            let decidedToAttack = false;
            let attackType = 'punch';
            if (this.facingRight === opponentIsToTheRight) {
                if (distanceToOpponent < this.kickRange && Math.random() < AI_ATTACK_CHANCE_IN_RANGE) {
                    decidedToAttack = true;
                    if (Math.random() < AI_KICK_CHANCE) {
                        attackType = 'kick';
                    } else if (distanceToOpponent >= this.punchRange) {
                        attackType = 'kick';
                    } else {
                        attackType = 'punch';
                    }
                } else if (distanceToOpponent < this.punchRange && Math.random() < AI_ATTACK_CHANCE_IN_RANGE) {
                    decidedToAttack = true;
                    attackType = 'punch';
                }
            }
            if (canAttack && decidedToAttack) {
                if (this.isSuperCharged && Math.random() < 0.8) {
                    if (attackType === 'kick') this.kick(); else this.punch();
                } else if (attackType === 'kick') {
                    this.kick();
                } else {
                    this.punch();
                }
                this.currentAction = 'attack';
            } else {
                if (Math.random() < AI_MOVE_CHANCE) {
                    const randomMove = Math.random();
                    if (distanceToOpponent > this.punchRange * 0.5) {
                        this.currentAction = opponentIsToTheRight ? 'moveRight' : 'moveLeft';
                        this.facingRight = opponentIsToTheRight;
                    } else if (randomMove < 0.3) {
                        this.currentAction = opponentIsToTheRight ? 'moveLeft' : 'moveRight';
                    } else {
                        this.currentAction = 'stand';
                    }
                    if (Math.random() < AI_JUMP_CHANCE && !this.isJumping) this.jump();
                } else {
                    this.currentAction = 'stand';
                }
            }
        }
        this.velocityX = 0;
        if (this.currentAction === 'moveLeft') this.velocityX = -this.speed;
        else if (this.currentAction === 'moveRight') this.velocityX = this.speed;
    }

    updatePiranhaProjectiles(opponent) {
        for (let i = this.activePiranhaProjectiles.length - 1; i >= 0; i--) {
            const p = this.activePiranhaProjectiles[i];
            p.x += p.velocityX * (p.direction ? 1 : -1);
            p.lifespan--;

            if (p.lifespan <= 0 || p.x > CANVAS_WIDTH || p.x + p.width < 0) {
                this.activePiranhaProjectiles.splice(i, 1);
                continue;
            }

            const opponentBox = { x: opponent.x, y: opponent.y, width: opponent.width, height: opponent.height };
            const projectileBox = { x: p.x, y: p.y, width: p.width, height: p.height };

            if (
                !opponent.isSwallowed && !opponent.isStunned &&
                projectileBox.x < opponentBox.x + opponentBox.width &&
                projectileBox.x + projectileBox.width > opponentBox.x &&
                projectileBox.y < opponentBox.y + opponentBox.height &&
                projectileBox.y + projectileBox.height > opponentBox.y
            ) {
                opponent.takeDamage(p.damage, p.direction);
                activeHitEffects.push({ text: "¡ÑAM!", x: p.x, y: p.y, color: "#ff6347", alpha: 1.0, size: 20, rotation: 0, lifetime: HIT_EFFECT_LIFETIME / 2 });
                this.activePiranhaProjectiles.splice(i, 1);
            }
        }
    }

    updateMoneyWads(opponent) {
        for (let i = this.activeMoneyWads.length - 1; i >= 0; i--) {
            const wad = this.activeMoneyWads[i];
            wad.velocityY += GRAVITY * 0.5;
            wad.y += wad.velocityY;
            wad.x += wad.velocityX;
            wad.rotation += wad.rotationSpeed;

            if (wad.y > CANVAS_HEIGHT) {
                this.activeMoneyWads.splice(i, 1);
                continue;
            }

            const opponentBox = { x: opponent.x, y: opponent.y, width: opponent.width, height: opponent.height };
            const wadBox = { x: wad.x, y: wad.y, width: wad.width, height: wad.height };

            if (
                !opponent.isSwallowed && !opponent.isStunned &&
                wadBox.x < opponentBox.x + opponentBox.width &&
                wadBox.x + wadBox.width > opponentBox.x &&
                wadBox.y < opponentBox.y + opponentBox.height &&
                wadBox.y + wadBox.height > opponentBox.y
            ) {
                opponent.takeDamage(wad.damage, wad.x > opponent.x + opponent.width / 2);
                activeHitEffects.push({ text: "$$$", x: wad.x, y: wad.y, color: "#22c55e", alpha: 1.0, size: 30, rotation: 0, lifetime: HIT_EFFECT_LIFETIME });
                this.activeMoneyWads.splice(i, 1);
            }
        }
    }
    
    updateCoins(opponent) {
        for (let i = this.activeCoins.length - 1; i >= 0; i--) {
            const coin = this.activeCoins[i];
            coin.velocityY += GRAVITY * 0.6; // Coins are a bit heavier
            coin.y += coin.velocityY;
            
            if (coin.y > CANVAS_HEIGHT) {
                this.activeCoins.splice(i, 1);
                continue;
            }

            const opponentBox = { x: opponent.x, y: opponent.y, width: opponent.width, height: opponent.height };
            const coinBox = { x: coin.x - coin.radius, y: coin.y - coin.radius, width: coin.radius * 2, height: coin.radius * 2 };
            
            if (
                !opponent.isSwallowed && !opponent.isStunned &&
                coinBox.x < opponentBox.x + opponentBox.width &&
                coinBox.x + coinBox.width > opponentBox.x &&
                coinBox.y < opponentBox.y + opponentBox.height &&
                coinBox.y + coinBox.height > opponentBox.y
            ) {
                opponent.takeDamage(COIN_RAIN_DAMAGE, coin.x > opponent.x + opponent.width / 2);
                activeHitEffects.push({ text: "$", x: coin.x, y: coin.y, color: "#facc15", alpha: 1.0, size: 20, rotation: 0, lifetime: HIT_EFFECT_LIFETIME });
                this.activeCoins.splice(i, 1);
            }
        }
    }

    updateCalculatorProjectiles(opponent) {
        for (let i = this.activeCalculators.length - 1; i >= 0; i--) {
            const calc = this.activeCalculators[i];
            calc.x += calc.velocityX;
            calc.y += calc.velocityY;
            calc.velocityY += GRAVITY * 0.4; // Las calculadoras son pesadas
            calc.rotation += calc.rotationSpeed;
            calc.lifespan--;

            if (calc.lifespan <= 0 || calc.y > CANVAS_HEIGHT) {
                this.activeCalculators.splice(i, 1);
                continue;
            }

            const opponentBox = { x: opponent.x, y: opponent.y, width: opponent.width, height: opponent.height };
            const calcBox = { x: calc.x, y: calc.y, width: calc.width, height: calc.height };

            if (
                !opponent.isSwallowed && !opponent.isStunned &&
                calcBox.x < opponentBox.x + opponentBox.width &&
                calcBox.x + calcBox.width > opponentBox.x &&
                calcBox.y < opponentBox.y + opponentBox.height &&
                calcBox.y + calcBox.height > opponentBox.y
            ) {
                opponent.takeDamage(CALCULATOR_PROJECTILE_DAMAGE, calc.velocityX > 0);
                activeHitEffects.push({ text: "ERROR", x: calc.x, y: calc.y, color: "#e53e3e", alpha: 1.0, size: 25, rotation: 0, lifetime: HIT_EFFECT_LIFETIME });
                this.activeCalculators.splice(i, 1);
            }
        }
    }

    updatePapers(opponent) {
        for (let i = this.activePapers.length - 1; i >= 0; i--) {
            const paper = this.activePapers[i];
            paper.velocityY += GRAVITY * 0.3;
            paper.y += paper.velocityY;
            paper.x += paper.velocityX;
            paper.rotation += paper.rotationSpeed;

            if (paper.y > CANVAS_HEIGHT) {
                this.activePapers.splice(i, 1);
                continue;
            }

            const opponentBox = { x: opponent.x, y: opponent.y, width: opponent.width, height: opponent.height };
            const paperBox = { x: paper.x, y: paper.y, width: paper.width, height: paper.height };
            
            if (
                !opponent.isSwallowed && !opponent.isStunned &&
                paperBox.x < opponentBox.x + opponentBox.width &&
                paperBox.x + paperBox.width > opponentBox.x &&
                paperBox.y < opponentBox.y + opponentBox.height &&
                paperBox.y + paperBox.height > opponentBox.y
            ) {
                opponent.takeDamage(PAPELUCHO_PAPER_DAMAGE, this.facingRight);
                opponent.isStunned = true;
                opponent.stunTimer = PAPELUCHO_STUN_DURATION;
                this.activePapers.splice(i, 1);
            }
        }
    }

    updateKisses(opponent) {
        for (let i = this.activeKisses.length - 1; i >= 0; i--) {
            const kiss = this.activeKisses[i];
            kiss.x += kiss.velocityX * (kiss.direction ? 1 : -1);
            kiss.lifespan--;

            if (kiss.lifespan <= 0 || kiss.x > CANVAS_WIDTH || kiss.x + kiss.width < 0) {
                this.activeKisses.splice(i, 1);
                continue;
            }

            const opponentBox = { x: opponent.x, y: opponent.y, width: opponent.width, height: opponent.height };
            const kissBox = { x: kiss.x, y: kiss.y, width: kiss.width, height: kiss.height };

            if (
                !opponent.isSwallowed && !opponent.isStunned &&
                kissBox.x < opponentBox.x + opponentBox.width &&
                kissBox.x + kissBox.width > opponentBox.x &&
                kissBox.y < opponentBox.y + opponentBox.height &&
                kissBox.y + kissBox.height > opponentBox.y
            ) {
                opponent.takeDamage(kiss.damage, kiss.direction);
                activeHitEffects.push({ text: "♥", x: kiss.x, y: kiss.y, color: "#ff69b4", alpha: 1.0, size: 30, rotation: 0, lifetime: HIT_EFFECT_LIFETIME });
                this.activeKisses.splice(i, 1);
            }
        }
    }

    updateHearts(opponent) {
        for (let i = this.activeHearts.length - 1; i >= 0; i--) {
            const heart = this.activeHearts[i];
            heart.x += heart.velocityX;
            heart.y += heart.velocityY;
            heart.lifespan--;

            if (heart.lifespan <= 0 || heart.x > CANVAS_WIDTH || heart.x + heart.width < 0) {
                this.activeHearts.splice(i, 1);
                continue;
            }

            const opponentBox = { x: opponent.x, y: opponent.y, width: opponent.width, height: opponent.height };
            const heartBox = { x: heart.x, y: heart.y, width: heart.width, height: heart.height };

            if (
                !opponent.isSwallowed && !opponent.isStunned &&
                heartBox.x < opponentBox.x + opponentBox.width &&
                heartBox.x + heartBox.width > opponentBox.x &&
                heartBox.y < opponentBox.y + opponentBox.height &&
                heartBox.y + heartBox.height > opponentBox.y
            ) {
                opponent.takeDamage(heart.damage, this.facingRight);
                activeHitEffects.push({ text: "♥", x: heart.x, y: heart.y, color: "#e879f9", alpha: 1.0, size: 25, rotation: 0, lifetime: HIT_EFFECT_LIFETIME });
                this.activeHearts.splice(i, 1);
            }
        }
    }
    
    // Método para dibujar el haz de luz de Tía Cote
    drawTiaCoteBeam() {
        if (!this.isCastingBeam) return;

        const beamProgress = 1 - (this.beamTimer / TIA_COTE_BEAM_DURATION);
        const currentAlpha = 0.8 * Math.sin(beamProgress * Math.PI); // Efecto de fade-in y fade-out

        ctx.save();
        
        const beamY = this.y + this.height * 0.3;
        const beamStartX = this.facingRight ? this.x + this.width / 2 : 0;
        const beamTotalWidth = this.facingRight ? CANVAS_WIDTH - beamStartX : this.x + this.width / 2;

        // Gradiente para el rayo
        const gradient = ctx.createLinearGradient(beamStartX, beamY, beamStartX, beamY + TIA_COTE_BEAM_WIDTH);
        gradient.addColorStop(0, `rgba(255, 255, 224, ${currentAlpha * 0.5})`); // Amarillo muy claro, casi blanco
        gradient.addColorStop(0.5, `rgba(253, 224, 71, ${currentAlpha})`); // Amarillo dorado
        gradient.addColorStop(1, `rgba(255, 255, 224, ${currentAlpha * 0.5})`);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(beamStartX, beamY, beamTotalWidth, TIA_COTE_BEAM_WIDTH);

        // Partículas de brillo dentro del rayo
        for (let i = 0; i < 20; i++) {
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.9 * currentAlpha})`;
            const particleX = beamStartX + Math.random() * beamTotalWidth;
            const particleY = beamY + Math.random() * TIA_COTE_BEAM_WIDTH;
            const particleSize = Math.random() * 3 + 1;
            ctx.fillRect(particleX, particleY, particleSize, particleSize);
        }

        ctx.restore();
    }


    drawZanjasCrack() {
        if (!this.isCastingCrack) return;

        const groundY = CANVAS_HEIGHT - 10;
        const halfLife = ZANJAS_CRACK_LIFESPAN / 2;

        // Progreso triangular simple: 0 -> 1 -> 0
        let progress = 0;
        if (this.crackTimer > halfLife) {
            progress = (ZANJAS_CRACK_LIFESPAN - this.crackTimer) / halfLife;
        } else {
            progress = this.crackTimer / halfLife;
        }

        const currentCrackWidth = ZANJAS_CRACK_WIDTH * progress;
        const currentCrackDepth = ZANJAS_CRACK_MAX_HEIGHT * progress;

        if (currentCrackWidth <= 2) return;

        ctx.save();
        // Abismo negro
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(this.crackCenterX - currentCrackWidth / 2, groundY);
        ctx.lineTo(this.crackCenterX + currentCrackWidth / 2, groundY);
        ctx.lineTo(this.crackCenterX, groundY + currentCrackDepth);
        ctx.closePath();
        ctx.fill();

        // Bordes irregulares
        ctx.strokeStyle = '#4a2a0a';
        ctx.lineWidth = 3;
        for (let s = -1; s <= 1; s += 2) {
            ctx.beginPath();
            ctx.moveTo(this.crackCenterX + (s * currentCrackWidth / 2), groundY);
            for (let i = 0; i <= 10; i++) {
                const p = i / 10;
                const x = this.crackCenterX + (s * (currentCrackWidth / 2) * (1 - p));
                const y = groundY + (Math.random() - 0.5) * 8 * progress;
                ctx.lineTo(x, y);
            }
            ctx.stroke();
        }
        ctx.restore();
    }

    draw() {
        if(this.isInvisible) return; // No dibujar si es invisible
        ctx.save();

         if (this.isDashing) {
            this.trail.forEach((pos, index) => {
                ctx.globalAlpha = (index / this.trail.length) * 0.5;
                 this.drawPlayerModel(pos.x, pos.y);
            });
            ctx.globalAlpha = 1;
        }
        this.drawPlayerModel(this.x, this.y);

        this.drawPiranhaProjectiles();
        this.drawMoneyWads();
        this.drawCoins();
        this.drawCalculatorProjectiles();
        this.drawPapers();
        this.drawKisses();
        this.drawHearts();
        this.drawTiaCoteBeam();
        
        if (this.isCastingCrack) {
            this.drawZanjasCrack();
        }
        
        if (this.isConfused) {
            ctx.font = `bold 24px 'Comic Sans MS'`;
            ctx.fillStyle = 'yellow';
            ctx.textAlign = 'center';
            ctx.fillText('???', this.x + this.width / 2, this.y - 20);
        } else if (this.isStunned) {
            ctx.font = `bold 24px 'Comic Sans MS'`;
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText('!!!', this.x + this.width / 2, this.y - 20);
        }

        if (this.isPerformingSuperAttackAnimation && this.attackVisualActive && this.superEffectTextureImage && this.superEffectTextureImage.complete && this.name !== "Piraña") {
            const effectWidth = this.width * 1.5;
            const effectHeight = this.height * 1.5;
            const effectX = this.x + (this.width - effectWidth) / 2;
            const effectY = this.y + (this.height - effectHeight) / 2;
            ctx.globalAlpha = 0.7;
            ctx.drawImage(this.superEffectTextureImage, effectX, effectY, effectWidth, effectHeight);
            ctx.globalAlpha = 1.0;
        }
        ctx.restore();
    }

     drawPlayerModel(x, y) {
        if (this.isSwallowed) {
            return; // No dibujar si está tragado
        }
        const originalX = this.x;
        const originalY = this.y;
        this.x = x;
        this.y = y;

        if (this.showBlurred) {
            ctx.filter = 'blur(4px)';
        } else if ((this.isPerformingSuperAttackAnimation || this.isCastingBeam) && this.attackVisualActive) {
            ctx.filter = 'brightness(1.75) saturate(2.5)';
        }

        const totalLegSegmentsHeight = this.thighHeight + this.lowerLegHeight;
        const torsoGlobalY = this.y + (this.height - this.torsoHeight - totalLegSegmentsHeight - this.shoeHeight);
        const torsoGlobalX = this.x + (this.width - this.torsoWidth) / 2;
        const headGlobalX = this.x + (this.width - this.headSize) / 2;
        const headGlobalY = torsoGlobalY - this.headSize;
        const visuallyBackArmIsRight = !this.facingRight;
        const visuallyBackLegIsFront = !this.facingRight;
        this.drawLeg(visuallyBackLegIsFront);
        this.drawLeg(!visuallyBackLegIsFront);
        if (this.facingRight) {
            this.drawArm(false);
            this.drawPartWithTexture('torso', torsoGlobalX, torsoGlobalY, this.torsoWidth, this.torsoHeight, !this.facingRight);
            if (this.name === 'Matthei Bolt' && this.isDashing) {
                this.drawVest(torsoGlobalX, torsoGlobalY);
            }
            this.drawPartWithTexture('head', headGlobalX, headGlobalY, this.headSize, this.headSize, !this.facingRight);
            this.drawArm(true);
        } else {
            this.drawArm(true);
            this.drawPartWithTexture('torso', torsoGlobalX, torsoGlobalY, this.torsoWidth, this.torsoHeight, !this.facingRight);
            if (this.name === 'Matthei Bolt' && this.isDashing) {
                this.drawVest(torsoGlobalX, torsoGlobalY);
            }
            this.drawPartWithTexture('head', headGlobalX, headGlobalY, this.headSize, this.headSize, !this.facingRight);
            this.drawArm(false);
        }

        ctx.filter = 'none';
        this.x = originalX;
        this.y = originalY;
    }

    drawVest(torsoX, torsoY) {
        ctx.save();
        if (!this.facingRight) {
             ctx.translate(this.x + this.width/2, 0);
             ctx.scale(-1,1);
             ctx.translate(-(this.x + this.width/2), 0);
        }

        if (this.yellowVestTextureImage && this.yellowVestTextureImage.complete && this.yellowVestTextureImage.width > 0) {
                ctx.drawImage(this.yellowVestTextureImage, torsoX, torsoY, this.torsoWidth, this.torsoHeight);
        } else {
            // Fallback si la textura no carga
            ctx.fillStyle = '#eab308'; // Amarillo-600 de Tailwind
            ctx.fillRect(torsoX, torsoY, this.torsoWidth, this.torsoHeight);

            // Bandas grises reflectantes
            const stripeHeight = this.torsoHeight / 6;
            ctx.fillStyle = '#a1a1aa'; // Zinc-400
            
            const stripe1Y = torsoY + this.torsoHeight * 0.4 - stripeHeight / 2;
            ctx.fillRect(torsoX, stripe1Y, this.torsoWidth, stripeHeight);
            
            const stripe2Y = torsoY + this.torsoHeight * 0.65 - stripeHeight / 2;
            ctx.fillRect(torsoX, stripe2Y, this.torsoWidth, stripeHeight);
        }
        ctx.restore();
    }


    updateAI() {
        if (this.isConfused) {
            this.confusionTimer--;
            this.confusionBlinkTimer--;
            if(this.confusionTimer <= 0) {
                this.isConfused = false;
                this.showBlurred = false;
            }
            if(this.confusionBlinkTimer <= 0) {
                this.showBlurred = !this.showBlurred;
                new Audio('audio/pouf-bomb.wav').play().catch(e => console.error("Error playing sound:", e));
                this.confusionBlinkTimer = 15; // Blink every 15 frames
            }
            return; // AI is confused, skip normal logic
         }

         if (this.isDashing || this.isSwallowed || this.isCastingCrack || this.isStunned || this.isCastingBeam) {
            return;
         }
        if (Date.now() - this.lastAIDecisionTime > AI_ACTION_INTERVAL) {
            this.lastAIDecisionTime = Date.now();
            const opponent = players.find(p => p !== this);
            if (!opponent || opponent.isInvisible) { // No hacer nada si el oponente es invisible
                this.currentAction = 'stand';
                return;
            }
            const distanceToOpponent = Math.abs((this.x + this.width / 2) - (opponent.x + opponent.width / 2)) - (this.width/2 + opponent.width/2);
            const opponentIsToTheRight = (opponent.x + opponent.width / 2) > (this.x + this.width / 2);
            if (distanceToOpponent < Math.max(this.punchRange, this.kickRange) * 1.5) {
                this.facingRight = opponentIsToTheRight;
            }
            const canAttack = !(this.isPunching || this.isKicking) && (Date.now() - this.lastAttackTime > this.attackCooldown);
            let decidedToAttack = false;
            let attackType = 'punch';
            if (this.facingRight === opponentIsToTheRight) {
                if (distanceToOpponent < this.kickRange && Math.random() < AI_ATTACK_CHANCE_IN_RANGE) {
                    decidedToAttack = true;
                    if (Math.random() < AI_KICK_CHANCE) {
                        attackType = 'kick';
                    } else if (distanceToOpponent >= this.punchRange) {
                        attackType = 'kick';
                    } else {
                        attackType = 'punch';
                    }
                } else if (distanceToOpponent < this.punchRange && Math.random() < AI_ATTACK_CHANCE_IN_RANGE) {
                    decidedToAttack = true;
                    attackType = 'punch';
                }
            }
            if (canAttack && decidedToAttack) {
                if (this.isSuperCharged && Math.random() < 0.8) {
                    if (attackType === 'kick') this.kick(); else this.punch();
                } else if (attackType === 'kick') {
                    this.kick();
                } else {
                    this.punch();
                }
                this.currentAction = 'attack';
            } else {
                if (Math.random() < AI_MOVE_CHANCE) {
                    const randomMove = Math.random();
                    if (distanceToOpponent > this.punchRange * 0.5) {
                        this.currentAction = opponentIsToTheRight ? 'moveRight' : 'moveLeft';
                        this.facingRight = opponentIsToTheRight;
                    } else if (randomMove < 0.3) {
                        this.currentAction = opponentIsToTheRight ? 'moveLeft' : 'moveRight';
                    } else {
                        this.currentAction = 'stand';
                    }
                    if (Math.random() < AI_JUMP_CHANCE && !this.isJumping) this.jump();
                } else {
                    this.currentAction = 'stand';
                }
            }
        }
        this.velocityX = 0;
        if (this.currentAction === 'moveLeft') this.velocityX = -this.speed;
        else if (this.currentAction === 'moveRight') this.velocityX = this.speed;
    }

    updatePiranhaProjectiles(opponent) {
        for (let i = this.activePiranhaProjectiles.length - 1; i >= 0; i--) {
            const p = this.activePiranhaProjectiles[i];
            p.x += p.velocityX * (p.direction ? 1 : -1);
            p.lifespan--;

            if (p.lifespan <= 0 || p.x > CANVAS_WIDTH || p.x + p.width < 0) {
                this.activePiranhaProjectiles.splice(i, 1);
                continue;
            }

            const opponentBox = { x: opponent.x, y: opponent.y, width: opponent.width, height: opponent.height };
            const projectileBox = { x: p.x, y: p.y, width: p.width, height: p.height };

            if (
                !opponent.isSwallowed && !opponent.isStunned &&
                projectileBox.x < opponentBox.x + opponentBox.width &&
                projectileBox.x + projectileBox.width > opponentBox.x &&
                projectileBox.y < opponentBox.y + opponentBox.height &&
                projectileBox.y + projectileBox.height > opponentBox.y
            ) {
                opponent.takeDamage(p.damage, p.direction);
                activeHitEffects.push({ text: "¡ÑAM!", x: p.x, y: p.y, color: "#ff6347", alpha: 1.0, size: 20, rotation: 0, lifetime: HIT_EFFECT_LIFETIME / 2 });
                this.activePiranhaProjectiles.splice(i, 1);
            }
        }
    }

    updateMoneyWads(opponent) {
        for (let i = this.activeMoneyWads.length - 1; i >= 0; i--) {
            const wad = this.activeMoneyWads[i];
            wad.velocityY += GRAVITY * 0.5;
            wad.y += wad.velocityY;
            wad.x += wad.velocityX;
            wad.rotation += wad.rotationSpeed;

            if (wad.y > CANVAS_HEIGHT) {
                this.activeMoneyWads.splice(i, 1);
                continue;
            }

            const opponentBox = { x: opponent.x, y: opponent.y, width: opponent.width, height: opponent.height };
            const wadBox = { x: wad.x, y: wad.y, width: wad.width, height: wad.height };

            if (
                !opponent.isSwallowed && !opponent.isStunned &&
                wadBox.x < opponentBox.x + opponentBox.width &&
                wadBox.x + wadBox.width > opponentBox.x &&
                wadBox.y < opponentBox.y + opponentBox.height &&
                wadBox.y + wadBox.height > opponentBox.y
            ) {
                opponent.takeDamage(wad.damage, wad.x > opponent.x + opponent.width / 2);
                activeHitEffects.push({ text: "$$$", x: wad.x, y: wad.y, color: "#22c55e", alpha: 1.0, size: 30, rotation: 0, lifetime: HIT_EFFECT_LIFETIME });
                this.activeMoneyWads.splice(i, 1);
            }
        }
    }
    
    updateCoins(opponent) {
        for (let i = this.activeCoins.length - 1; i >= 0; i--) {
            const coin = this.activeCoins[i];
            coin.velocityY += GRAVITY * 0.6; // Coins are a bit heavier
            coin.y += coin.velocityY;
            
            if (coin.y > CANVAS_HEIGHT) {
                this.activeCoins.splice(i, 1);
                continue;
            }

            const opponentBox = { x: opponent.x, y: opponent.y, width: opponent.width, height: opponent.height };
            const coinBox = { x: coin.x - coin.radius, y: coin.y - coin.radius, width: coin.radius * 2, height: coin.radius * 2 };
            
            if (
                !opponent.isSwallowed && !opponent.isStunned &&
                coinBox.x < opponentBox.x + opponentBox.width &&
                coinBox.x + coinBox.width > opponentBox.x &&
                coinBox.y < opponentBox.y + opponentBox.height &&
                coinBox.y + coinBox.height > opponentBox.y
            ) {
                opponent.takeDamage(COIN_RAIN_DAMAGE, coin.x > opponent.x + opponent.width / 2);
                activeHitEffects.push({ text: "$", x: coin.x, y: coin.y, color: "#facc15", alpha: 1.0, size: 20, rotation: 0, lifetime: HIT_EFFECT_LIFETIME });
                this.activeCoins.splice(i, 1);
            }
        }
    }

    updateCalculatorProjectiles(opponent) {
        for (let i = this.activeCalculators.length - 1; i >= 0; i--) {
            const calc = this.activeCalculators[i];
            calc.x += calc.velocityX;
            calc.y += calc.velocityY;
            calc.velocityY += GRAVITY * 0.4; // Las calculadoras son pesadas
            calc.rotation += calc.rotationSpeed;
            calc.lifespan--;

            if (calc.lifespan <= 0 || calc.y > CANVAS_HEIGHT) {
                this.activeCalculators.splice(i, 1);
                continue;
            }

            const opponentBox = { x: opponent.x, y: opponent.y, width: opponent.width, height: opponent.height };
            const calcBox = { x: calc.x, y: calc.y, width: calc.width, height: calc.height };

            if (
                !opponent.isSwallowed && !opponent.isStunned &&
                calcBox.x < opponentBox.x + opponentBox.width &&
                calcBox.x + calcBox.width > opponentBox.x &&
                calcBox.y < opponentBox.y + opponentBox.height &&
                calcBox.y + calcBox.height > opponentBox.y
            ) {
                opponent.takeDamage(CALCULATOR_PROJECTILE_DAMAGE, calc.velocityX > 0);
                activeHitEffects.push({ text: "ERROR", x: calc.x, y: calc.y, color: "#e53e3e", alpha: 1.0, size: 25, rotation: 0, lifetime: HIT_EFFECT_LIFETIME });
                this.activeCalculators.splice(i, 1);
            }
        }
    }

    updatePapers(opponent) {
        for (let i = this.activePapers.length - 1; i >= 0; i--) {
            const paper = this.activePapers[i];
            paper.velocityY += GRAVITY * 0.3;
            paper.y += paper.velocityY;
            paper.x += paper.velocityX;
            paper.rotation += paper.rotationSpeed;

            if (paper.y > CANVAS_HEIGHT) {
                this.activePapers.splice(i, 1);
                continue;
            }

            const opponentBox = { x: opponent.x, y: opponent.y, width: opponent.width, height: opponent.height };
            const paperBox = { x: paper.x, y: paper.y, width: paper.width, height: paper.height };
            
            if (
                !opponent.isSwallowed && !opponent.isStunned &&
                paperBox.x < opponentBox.x + opponentBox.width &&
                paperBox.x + paperBox.width > opponentBox.x &&
                paperBox.y < opponentBox.y + opponentBox.height &&
                paperBox.y + paperBox.height > opponentBox.y
            ) {
                opponent.takeDamage(PAPELUCHO_PAPER_DAMAGE, this.facingRight);
                opponent.isStunned = true;
                opponent.stunTimer = PAPELUCHO_STUN_DURATION;
                this.activePapers.splice(i, 1);
            }
        }
    }

    updateKisses(opponent) {
        for (let i = this.activeKisses.length - 1; i >= 0; i--) {
            const kiss = this.activeKisses[i];
            kiss.x += kiss.velocityX * (kiss.direction ? 1 : -1);
            kiss.lifespan--;

            if (kiss.lifespan <= 0 || kiss.x > CANVAS_WIDTH || kiss.x + kiss.width < 0) {
                this.activeKisses.splice(i, 1);
                continue;
            }

            const opponentBox = { x: opponent.x, y: opponent.y, width: opponent.width, height: opponent.height };
            const kissBox = { x: kiss.x, y: kiss.y, width: kiss.width, height: kiss.height };

            if (
                !opponent.isSwallowed && !opponent.isStunned &&
                kissBox.x < opponentBox.x + opponentBox.width &&
                kissBox.x + kissBox.width > opponentBox.x &&
                kissBox.y < opponentBox.y + opponentBox.height &&
                kissBox.y + kissBox.height > opponentBox.y
            ) {
                opponent.takeDamage(kiss.damage, kiss.direction);
                activeHitEffects.push({ text: "♥", x: kiss.x, y: kiss.y, color: "#ff69b4", alpha: 1.0, size: 30, rotation: 0, lifetime: HIT_EFFECT_LIFETIME });
                this.activeKisses.splice(i, 1);
            }
        }
    }

    updateHearts(opponent) {
        for (let i = this.activeHearts.length - 1; i >= 0; i--) {
            const heart = this.activeHearts[i];
            heart.x += heart.velocityX;
            heart.y += heart.velocityY;
            heart.lifespan--;

            if (heart.lifespan <= 0 || heart.x > CANVAS_WIDTH || heart.x + heart.width < 0) {
                this.activeHearts.splice(i, 1);
                continue;
            }

            const opponentBox = { x: opponent.x, y: opponent.y, width: opponent.width, height: opponent.height };
            const heartBox = { x: heart.x, y: heart.y, width: heart.width, height: heart.height };

            if (
                !opponent.isSwallowed && !opponent.isStunned &&
                heartBox.x < opponentBox.x + opponentBox.width &&
                heartBox.x + heartBox.width > opponentBox.x &&
                heartBox.y < opponentBox.y + opponentBox.height &&
                heartBox.y + heartBox.height > opponentBox.y
            ) {
                opponent.takeDamage(heart.damage, this.facingRight);
                activeHitEffects.push({ text: "♥", x: heart.x, y: heart.y, color: "#e879f9", alpha: 1.0, size: 25, rotation: 0, lifetime: HIT_EFFECT_LIFETIME });
                this.activeHearts.splice(i, 1);
            }
        }
    }
    
    // Método para dibujar el haz de luz de Tía Cote
    drawTiaCoteBeam() {
        if (!this.isCastingBeam) return;

        const beamProgress = 1 - (this.beamTimer / TIA_COTE_BEAM_DURATION);
        const currentAlpha = 0.8 * Math.sin(beamProgress * Math.PI); // Efecto de fade-in y fade-out

        ctx.save();
        
        const beamY = this.y + this.height * 0.3;
        const beamStartX = this.facingRight ? this.x + this.width / 2 : 0;
        const beamTotalWidth = this.facingRight ? CANVAS_WIDTH - beamStartX : this.x + this.width / 2;

        // Gradiente para el rayo
        const gradient = ctx.createLinearGradient(beamStartX, beamY, beamStartX, beamY + TIA_COTE_BEAM_WIDTH);
        gradient.addColorStop(0, `rgba(255, 255, 224, ${currentAlpha * 0.5})`); // Amarillo muy claro, casi blanco
        gradient.addColorStop(0.5, `rgba(253, 224, 71, ${currentAlpha})`); // Amarillo dorado
        gradient.addColorStop(1, `rgba(255, 255, 224, ${currentAlpha * 0.5})`);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(beamStartX, beamY, beamTotalWidth, TIA_COTE_BEAM_WIDTH);

        // Partículas de brillo dentro del rayo
        for (let i = 0; i < 20; i++) {
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.9 * currentAlpha})`;
            const particleX = beamStartX + Math.random() * beamTotalWidth;
            const particleY = beamY + Math.random() * TIA_COTE_BEAM_WIDTH;
            const particleSize = Math.random() * 3 + 1;
            ctx.fillRect(particleX, particleY, particleSize, particleSize);
        }

        ctx.restore();
    }


    drawZanjasCrack() {
        if (!this.isCastingCrack) return;

        const groundY = CANVAS_HEIGHT - 10;
        const halfLife = ZANJAS_CRACK_LIFESPAN / 2;

        // Progreso triangular simple: 0 -> 1 -> 0
        let progress = 0;
        if (this.crackTimer > halfLife) {
            progress = (ZANJAS_CRACK_LIFESPAN - this.crackTimer) / halfLife;
        } else {
            progress = this.crackTimer / halfLife;
        }

        const currentCrackWidth = ZANJAS_CRACK_WIDTH * progress;
        const currentCrackDepth = ZANJAS_CRACK_MAX_HEIGHT * progress;

        if (currentCrackWidth <= 2) return;

        ctx.save();
        // Abismo negro
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(this.crackCenterX - currentCrackWidth / 2, groundY);
        ctx.lineTo(this.crackCenterX + currentCrackWidth / 2, groundY);
        ctx.lineTo(this.crackCenterX, groundY + currentCrackDepth);
        ctx.closePath();
        ctx.fill();

        // Bordes irregulares
        ctx.strokeStyle = '#4a2a0a';
        ctx.lineWidth = 3;
        for (let s = -1; s <= 1; s += 2) {
            ctx.beginPath();
            ctx.moveTo(this.crackCenterX + (s * currentCrackWidth / 2), groundY);
            for (let i = 0; i <= 10; i++) {
                const p = i / 10;
                const x = this.crackCenterX + (s * (currentCrackWidth / 2) * (1 - p));
                const y = groundY + (Math.random() - 0.5) * 8 * progress;
                ctx.lineTo(x, y);
            }
            ctx.stroke();
        }
        ctx.restore();
    }

    draw() {
        if(this.isInvisible) return; // No dibujar si es invisible
        ctx.save();

         if (this.isDashing) {
            this.trail.forEach((pos, index) => {
                ctx.globalAlpha = (index / this.trail.length) * 0.5;
                 this.drawPlayerModel(pos.x, pos.y);
            });
            ctx.globalAlpha = 1;
        }
        this.drawPlayerModel(this.x, this.y);

        this.drawPiranhaProjectiles();
        this.drawMoneyWads();
        this.drawCoins();
        this.drawCalculatorProjectiles();
        this.drawPapers();
        this.drawKisses();
        this.drawHearts();
        this.drawTiaCoteBeam();
        
        if (this.isCastingCrack) {
            this.drawZanjasCrack();
        }
        
        if (this.isConfused) {
            ctx.font = `bold 24px 'Comic Sans MS'`;
            ctx.fillStyle = 'yellow';
            ctx.textAlign = 'center';
            ctx.fillText('???', this.x + this.width / 2, this.y - 20);
        } else if (this.isStunned) {
            ctx.font = `bold 24px 'Comic Sans MS'`;
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText('!!!', this.x + this.width / 2, this.y - 20);
        }

        if (this.isPerformingSuperAttackAnimation && this.attackVisualActive && this.superEffectTextureImage && this.superEffectTextureImage.complete && this.name !== "Piraña") {
            const effectWidth = this.width * 1.5;
            const effectHeight = this.height * 1.5;
            const effectX = this.x + (this.width - effectWidth) / 2;
            const effectY = this.y + (this.height - effectHeight) / 2;
            ctx.globalAlpha = 0.7;
            ctx.drawImage(this.superEffectTextureImage, effectX, effectY, effectWidth, effectHeight);
            ctx.globalAlpha = 1.0;
        }
        ctx.restore();
    }

     drawPlayerModel(x, y) {
        if (this.isSwallowed) {
            return; // No dibujar si está tragado
        }
        const originalX = this.x;
        const originalY = this.y;
        this.x = x;
        this.y = y;

        if (this.showBlurred) {
            ctx.filter = 'blur(4px)';
        } else if ((this.isPerformingSuperAttackAnimation || this.isCastingBeam) && this.attackVisualActive) {
            ctx.filter = 'brightness(1.75) saturate(2.5)';
        }

        const totalLegSegmentsHeight = this.thighHeight + this.lowerLegHeight;
        const torsoGlobalY = this.y + (this.height - this.torsoHeight - totalLegSegmentsHeight - this.shoeHeight);
        const torsoGlobalX = this.x + (this.width - this.torsoWidth) / 2;
        const headGlobalX = this.x + (this.width - this.headSize) / 2;
        const headGlobalY = torsoGlobalY - this.headSize;
        const visuallyBackArmIsRight = !this.facingRight;
        const visuallyBackLegIsFront = !this.facingRight;
        this.drawLeg(visuallyBackLegIsFront);
        this.drawLeg(!visuallyBackLegIsFront);
        if (this.facingRight) {
            this.drawArm(false);
            this.drawPartWithTexture('torso', torsoGlobalX, torsoGlobalY, this.torsoWidth, this.torsoHeight, !this.facingRight);
            if (this.name === 'Matthei Bolt' && this.isDashing) {
                this.drawVest(torsoGlobalX, torsoGlobalY);
            }
            this.drawPartWithTexture('head', headGlobalX, headGlobalY, this.headSize, this.headSize, !this.facingRight);
            this.drawArm(true);
        } else {
            this.drawArm(true);
            this.drawPartWithTexture('torso', torsoGlobalX, torsoGlobalY, this.torsoWidth, this.torsoHeight, !this.facingRight);
            if (this.name === 'Matthei Bolt' && this.isDashing) {
                this.drawVest(torsoGlobalX, torsoGlobalY);
            }
            this.drawPartWithTexture('head', headGlobalX, headGlobalY, this.headSize, this.headSize, !this.facingRight);
            this.drawArm(false);
        }

        ctx.filter = 'none';
        this.x = originalX;
        this.y = originalY;
    }

    drawVest(torsoX, torsoY) {
        ctx.save();
        if (!this.facingRight) {
             ctx.translate(this.x + this.width/2, 0);
             ctx.scale(-1,1);
             ctx.translate(-(this.x + this.width/2), 0);
        }

        if (this.yellowVestTextureImage && this.yellowVestTextureImage.complete && this.yellowVestTextureImage.width > 0) {
                ctx.drawImage(this.yellowVestTextureImage, torsoX, torsoY, this.torsoWidth, this.torsoHeight);
        } else {
            // Fallback si la textura no carga
            ctx.fillStyle = '#eab308'; // Amarillo-600 de Tailwind
            ctx.fillRect(torsoX, torsoY, this.torsoWidth, this.torsoHeight);

            // Bandas grises reflectantes
            const stripeHeight = this.torsoHeight / 6;
            ctx.fillStyle = '#a1a1aa'; // Zinc-400
            
            const stripe1Y = torsoY + this.torsoHeight * 0.4 - stripeHeight / 2;
            ctx.fillRect(torsoX, stripe1Y, this.torsoWidth, stripeHeight);
            
            const stripe2Y = torsoY + this.torsoHeight * 0.65 - stripeHeight / 2;
            ctx.fillRect(torsoX, stripe2Y, this.torsoWidth, stripeHeight);
        }
        ctx.restore();
    }


    updateAI() {
        if (this.isConfused) {
            this.confusionTimer--;
            this.confusionBlinkTimer--;
            if(this.confusionTimer <= 0) {
                this.isConfused = false;
                this.showBlurred = false;
            }
            if(this.confusionBlinkTimer <= 0) {
                this.showBlurred = !this.showBlurred;
                new Audio('audio/pouf-bomb.wav').play().catch(e => console.error("Error playing sound:", e));
                this.confusionBlinkTimer = 15; // Blink every 15 frames
            }
            return; // AI is confused, skip normal logic
         }

         if (this.isDashing || this.isSwallowed || this.isCastingCrack || this.isStunned || this.isCastingBeam) {
            return;
         }
        if (Date.now() - this.lastAIDecisionTime > AI_ACTION_INTERVAL) {
            this.lastAIDecisionTime = Date.now();
            const opponent = players.find(p => p !== this);
            if (!opponent || opponent.isInvisible) { // No hacer nada si el oponente es invisible
                this.currentAction = 'stand';
                return;
            }
            const distanceToOpponent = Math.abs((this.x + this.width / 2) - (opponent.x + opponent.width / 2)) - (this.width/2 + opponent.width/2);
            const opponentIsToTheRight = (opponent.x + opponent.width / 2) > (this.x + this.width / 2);
            if (distanceToOpponent < Math.max(this.punchRange, this.kickRange) * 1.5) {
                this.facingRight = opponentIsToTheRight;
            }
            const canAttack = !(this.isPunching || this.isKicking) && (Date.now() - this.lastAttackTime > this.attackCooldown);
            let decidedToAttack = false;
            let attackType = 'punch';
            if (this.facingRight === opponentIsToTheRight) {
                if (distanceToOpponent < this.kickRange && Math.random() < AI_ATTACK_CHANCE_IN_RANGE) {
                    decidedToAttack = true;
                    if (Math.random() < AI_KICK_CHANCE) {
                        attackType = 'kick';
                    } else if (distanceToOpponent >= this.punchRange) {
                        attackType = 'kick';
                    } else {
                        attackType = 'punch';
                    }
                } else if (distanceToOpponent < this.punchRange && Math.random() < AI_ATTACK_CHANCE_IN_RANGE) {
                    decidedToAttack = true;
                    attackType = 'punch';
                }
            }
            if (canAttack && decidedToAttack) {
                if (this.isSuperCharged && Math.random() < 0.8) {
                    if (attackType === 'kick') this.kick(); else this.punch();
                } else if (attackType === 'kick') {
                    this.kick();
                } else {
                    this.punch();
                }
                this.currentAction = 'attack';
            } else {
                if (Math.random() < AI_MOVE_CHANCE) {
                    const randomMove = Math.random();
                    if (distanceToOpponent > this.punchRange * 0.5) {
                        this.currentAction = opponentIsToTheRight ? 'moveRight' : 'moveLeft';
                        this.facingRight = opponentIsToTheRight;
                    } else if (randomMove < 0.3) {
                        this.currentAction = opponentIsToTheRight ? 'moveLeft' : 'moveRight';
                    } else {
                        this.currentAction = 'stand';
                    }
                    if (Math.random() < AI_JUMP_CHANCE && !this.isJumping) this.jump();
                } else {
                    this.currentAction = 'stand';
                }
            }
        }
        this.velocityX = 0;
        if (this.currentAction === 'moveLeft') this.velocityX = -this.speed;
        else if (this.currentAction === 'moveRight') this.velocityX = this.speed;
    }

    updatePiranhaProjectiles(opponent) {
        for (let i = this.activePiranhaProjectiles.length - 1; i >= 0; i--) {
            const p = this.activePiranhaProjectiles[i];
            p.x += p.velocityX * (p.direction ? 1 : -1);
            p.lifespan--;

            if (p.lifespan <= 0 || p.x > CANVAS_WIDTH || p.x + p.width < 0) {
                this.activePiranhaProjectiles.splice(i, 1);
                continue;
            }

            const opponentBox = { x: opponent.x, y: opponent.y, width: opponent.width, height: opponent.height };
            const projectileBox = { x: p.x, y: p.y, width: p.width, height: p.height };

            if (
                !opponent.isSwallowed && !opponent.isStunned &&
                projectileBox.x < opponentBox.x + opponentBox.width &&
                projectileBox.x + projectileBox.width > opponentBox.x &&
                projectileBox.y < opponentBox.y + opponentBox.height &&
                projectileBox.y + projectileBox.height > opponentBox.y
            ) {
                opponent.takeDamage(p.damage, p.direction);
                activeHitEffects.push({ text: "¡ÑAM!", x: p.x, y: p.y, color: "#ff6347", alpha: 1.0, size: 20, rotation: 0, lifetime: HIT_EFFECT_LIFETIME / 2 });
                this.activePiranhaProjectiles.splice(i, 1);
            }
        }
    }

    updateMoneyWads(opponent) {
        for (let i = this.activeMoneyWads.length - 1; i >= 0; i--) {
            const wad = this.activeMoneyWads[i];
            wad.velocityY += GRAVITY * 0.5;
            wad.y += wad.velocityY;
            wad.x += wad.velocityX;
            wad.rotation += wad.rotationSpeed;

            if (wad.y > CANVAS_HEIGHT) {
                this.activeMoneyWads.splice(i, 1);
                continue;
            }

            const opponentBox = { x: opponent.x, y: opponent.y, width: opponent.width, height: opponent.height };
            const wadBox = { x: wad.x, y: wad.y, width: wad.width, height: wad.height };

            if (
                !opponent.isSwallowed && !opponent.isStunned &&
                wadBox.x < opponentBox.x + opponentBox.width &&
                wadBox.x + wadBox.width > opponentBox.x &&
                wadBox.y < opponentBox.y + opponentBox.height &&
                wadBox.y + wadBox.height > opponentBox.y
            ) {
                opponent.takeDamage(wad.damage, wad.x > opponent.x + opponent.width / 2);
                activeHitEffects.push({ text: "$$$", x: wad.x, y: wad.y, color: "#22c55e", alpha: 1.0, size: 30, rotation: 0, lifetime: HIT_EFFECT_LIFETIME });
                this.activeMoneyWads.splice(i, 1);
            }
        }
    }
    
    updateCoins(opponent) {
        for (let i = this.activeCoins.length - 1; i >= 0; i--) {
            const coin = this.activeCoins[i];
            coin.velocityY += GRAVITY * 0.6; // Coins are a bit heavier
            coin.y += coin.velocityY;
            
            if (coin.y > CANVAS_HEIGHT) {
                this.activeCoins.splice(i, 1);
                continue;
            }

            const opponentBox = { x: opponent.x, y: opponent.y, width: opponent.width, height: opponent.height };
            const coinBox = { x: coin.x - coin.radius, y: coin.y - coin.radius, width: coin.radius * 2, height: coin.radius * 2 };
            
            if (
                !opponent.isSwallowed && !opponent.isStunned &&
                coinBox.x < opponentBox.x + opponentBox.width &&
                coinBox.x + coinBox.width > opponentBox.x &&
                coinBox.y < opponentBox.y + opponentBox.height &&
                coinBox.y + coinBox.height > opponentBox.y
            ) {
                opponent.takeDamage(COIN_RAIN_DAMAGE, coin.x > opponent.x + opponent.width / 2);
                activeHitEffects.push({ text: "$", x: coin.x, y: coin.y, color: "#facc15", alpha: 1.0, size: 20, rotation: 0, lifetime: HIT_EFFECT_LIFETIME });
                this.activeCoins.splice(i, 1);
            }
        }
    }

    updateCalculatorProjectiles(opponent) {
        for (let i = this.activeCalculators.length - 1; i >= 0; i--) {
            const calc = this.activeCalculators[i];
            calc.x += calc.velocityX;
            calc.y += calc.velocityY;
            calc.velocityY += GRAVITY * 0.4; // Las calculadoras son pesadas
            calc.rotation += calc.rotationSpeed;
            calc.lifespan--;

            if (calc.lifespan <= 0 || calc.y > CANVAS_HEIGHT) {
                this.activeCalculators.splice(i, 1);
                continue;
            }

            const opponentBox = { x: opponent.x, y: opponent.y, width: opponent.width, height: opponent.height };
            const calcBox = { x: calc.x, y: calc.y, width: calc.width, height: calc.height };

            if (
                !opponent.isSwallowed && !opponent.isStunned &&
                calcBox.x < opponentBox.x + opponentBox.width &&
                calcBox.x + calcBox.width > opponentBox.x &&
                calcBox.y < opponentBox.y + opponentBox.height &&
                calcBox.y + calcBox.height > opponentBox.y
            ) {
                opponent.takeDamage(CALCULATOR_PROJECTILE_DAMAGE, calc.velocityX > 0);
                activeHitEffects.push({ text: "ERROR", x: calc.x, y: calc.y, color: "#e53e3e", alpha: 1.0, size: 25, rotation: 0, lifetime: HIT_EFFECT_LIFETIME });
                this.activeCalculators.splice(i, 1);
            }
        }
    }

    updatePapers(opponent) {
        for (let i = this.activePapers.length - 1; i >= 0; i--) {
            const paper = this.activePapers[i];
            paper.velocityY += GRAVITY * 0.3;
            paper.y += paper.velocityY;
            paper.x += paper.velocityX;
            paper.rotation += paper.rotationSpeed;

            if (paper.y > CANVAS_HEIGHT) {
                this.activePapers.splice(i, 1);
                continue;
            }

            const opponentBox = { x: opponent.x, y: opponent.y, width: opponent.width, height: opponent.height };
            const paperBox = { x: paper.x, y: paper.y, width: paper.width, height: paper.height };
            
            if (
                !opponent.isSwallowed && !opponent.isStunned &&
                paperBox.x < opponentBox.x + opponentBox.width &&
                paperBox.x + paperBox.width > opponentBox.x &&
                paperBox.y < opponentBox.y + opponentBox.height &&
                paperBox.y + paperBox.height > opponentBox.y
            ) {
                opponent.takeDamage(PAPELUCHO_PAPER_DAMAGE, this.facingRight);
                opponent.isStunned = true;
                opponent.stunTimer = PAPELUCHO_STUN_DURATION;
                this.activePapers.splice(i, 1);
            }
        }
    }

    updateKisses(opponent) {
        for (let i = this.activeKisses.length - 1; i >= 0; i--) {
            const kiss = this.activeKisses[i];
            kiss.x += kiss.velocityX * (kiss.direction ? 1 : -1);
            kiss.lifespan--;

            if (kiss.lifespan <= 0 || kiss.x > CANVAS_WIDTH || kiss.x + kiss.width < 0) {
                this.activeKisses.splice(i, 1);
                continue;
            }

            const opponentBox = { x: opponent.x, y: opponent.y, width: opponent.width, height: opponent.height };
            const kissBox = { x: kiss.x, y: kiss.y, width: kiss.width, height: kiss.height };

            if (
                !opponent.isSwallowed && !opponent.isStunned &&
                kissBox.x < opponentBox.x + opponentBox.width &&
                kissBox.x + kissBox.width > opponentBox.x &&
                kissBox.y < opponentBox.y + opponentBox.height &&
                kissBox.y + kissBox.height > opponentBox.y
            ) {
                opponent.takeDamage(kiss.damage, kiss.direction);
                activeHitEffects.push({ text: "♥", x: kiss.x, y: kiss.y, color: "#ff69b4", alpha: 1.0, size: 30, rotation: 0, lifetime: HIT_EFFECT_LIFETIME });
                this.activeKisses.splice(i, 1);
            }
        }
    }

    updateHearts(opponent) {
        for (let i = this.activeHearts.length - 1; i >= 0; i--) {
            const heart = this.activeHearts[i];
            heart.x += heart.velocityX;
            heart.y += heart.velocityY;
            heart.lifespan--;

            if (heart.lifespan <= 0 || heart.x > CANVAS_WIDTH || heart.x + heart.width < 0) {
                this.activeHearts.splice(i, 1);
                continue;
            }

            const opponentBox = { x: opponent.x, y: opponent.y, width: opponent.width, height: opponent.height };
            const heartBox = { x: heart.x, y: heart.y, width: heart.width, height: heart.height };

            if (
                !opponent.isSwallowed && !opponent.isStunned &&
                heartBox.x < opponentBox.x + opponentBox.width &&
                heartBox.x + heartBox.width > opponentBox.x &&
                heartBox.y < opponentBox.y + opponentBox.height &&
                heartBox.y + heartBox.height > opponentBox.y
            ) {
                opponent.takeDamage(heart.damage, this.facingRight);
                activeHitEffects.push({ text: "♥", x: heart.x, y: heart.y, color: "#e879f9", alpha: 1.0, size: 25, rotation: 0, lifetime: HIT_EFFECT_LIFETIME });
                this.activeHearts.splice(i, 1);
            }
        }
    }
    
    // Método para dibujar el haz de luz de Tía Cote
    drawTiaCoteBeam() {
        if (!this.isCastingBeam) return;

        const beamProgress = 1 - (this.beamTimer / TIA_COTE_BEAM_DURATION);
        const currentAlpha = 0.8 * Math.sin(beamProgress * Math.PI); // Efecto de fade-in y fade-out

        ctx.save();
        
        const beamY = this.y + this.height * 0.3;
        const beamStartX = this.facingRight ? this.x + this.width / 2 : 0;
        const beamTotalWidth = this.facingRight ? CANVAS_WIDTH - beamStartX : this.x + this.width / 2;

        // Gradiente para el rayo
        const gradient = ctx.createLinearGradient(beamStartX, beamY, beamStartX, beamY + TIA_COTE_BEAM_WIDTH);
        gradient.addColorStop(0, `rgba(255, 255, 224, ${currentAlpha * 0.5})`); // Amarillo muy claro, casi blanco
        gradient.addColorStop(0.5, `rgba(253, 224, 71, ${currentAlpha})`); // Amarillo dorado
        gradient.addColorStop(1, `rgba(255, 255, 224, ${currentAlpha * 0.5})`);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(beamStartX, beamY, beamTotalWidth, TIA_COTE_BEAM_WIDTH);

        // Partículas de brillo dentro del rayo
        for (let i = 0; i < 20; i++) {
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.9 * currentAlpha})`;
            const particleX = beamStartX + Math.random() * beamTotalWidth;
            const particleY = beamY + Math.random() * TIA_COTE_BEAM_WIDTH;
            const particleSize = Math.random() * 3 + 1;
            ctx.fillRect(particleX, particleY, particleSize, particleSize);
        }

        ctx.restore();
    }


    drawZanjasCrack() {
        if (!this.isCastingCrack) return;

        const groundY = CANVAS_HEIGHT - 10;
        const halfLife = ZANJAS_CRACK_LIFESPAN / 2;

        // Progreso triangular simple: 0 -> 1 -> 0
        let progress = 0;
        if (this.crackTimer > halfLife) {
            progress = (ZANJAS_CRACK_LIFESPAN - this.crackTimer) / halfLife;
        } else {
            progress = this.crackTimer / halfLife;
        }

        const currentCrackWidth = ZANJAS_CRACK_WIDTH * progress;
        const currentCrackDepth = ZANJAS_CRACK_MAX_HEIGHT * progress;

        if (currentCrackWidth <= 2) return;

        ctx.save();
        // Abismo negro
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(this.crackCenterX - currentCrackWidth / 2, groundY);
        ctx.lineTo(this.crackCenterX + currentCrackWidth / 2, groundY);
        ctx.lineTo(this.crackCenterX, groundY + currentCrackDepth);
        ctx.closePath();
        ctx.fill();

        // Bordes irregulares
        ctx.strokeStyle = '#4a2a0a';
        ctx.lineWidth = 3;
        for (let s = -1; s <= 1; s += 2) {
            
