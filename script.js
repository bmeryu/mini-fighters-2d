// Obtención de elementos del DOM
const splashScreen = document.getElementById('splash-screen');
const continueButton = document.getElementById('continue-button');
const gameWrapper = document.getElementById('game-wrapper');
const mainHeader = document.getElementById('main-header');
const cornerLogo = document.getElementById('corner-logo');
const mainTitle = document.getElementById('main-title');
const gameUiTop = document.getElementById('game-ui-top');
const battleFooter = document.getElementById('battle-footer');

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
const POWER_GAIN_PER_CLICK = 4; // Original: 1. Reducido aún más para minimizar el impacto del clic.

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
                this.confusionBlinkTimer = 15; // Blink every 15 frames
                new Audio('audio/pouf-bomb.wav').play().catch(e => console.error("Error playing sound:", e));
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
                opponent.takeDamage(coin.damage, coin.x > opponent.x + opponent.width / 2);
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
                opponent.takeDamage(calc.damage, calc.velocityX > 0);
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
    
    // Método para actualizar la lógica del haz de luz de Tía Cote
    updateTiaCoteBeam(opponent) {
        if (!this.isCastingBeam) return;
        
        this.beamTimer--;
        if (this.beamTimer <= 0) {
            this.isCastingBeam = false;
            this.isPerformingSuperAttackAnimation = false; // Termina la animación
            this.attackVisualActive = false;
            return;
        }

        const beamY = this.y + this.height * 0.3;
        const beamHitbox = {
            x: this.facingRight ? this.x + this.width / 2 : 0,
            y: beamY,
            width: CANVAS_WIDTH,
            height: TIA_COTE_BEAM_WIDTH
        };
        
        const opponentBox = { x: opponent.x, y: opponent.y, width: opponent.width, height: opponent.height };

        if (
            !opponent.isSwallowed && !opponent.isStunned &&
            beamHitbox.x < opponentBox.x + opponentBox.width &&
            beamHitbox.x + beamHitbox.width > opponentBox.x &&
            beamHitbox.y < opponentBox.y + opponentBox.height &&
            beamHitbox.y + beamHitbox.height > opponentBox.y
        ) {
            opponent.takeDamage(TIA_COTE_BEAM_DAMAGE_PER_FRAME, this.facingRight);
        }
    }


     updateBoltDash(opponent) {
        if (!this.isDashing) return;

        const moveDirection = Math.sign(this.dashTargetX - this.x);
        this.x += moveDirection * BOLT_DASH_SPEED;
        this.facingRight = moveDirection > 0;

        // Collision check
        const opponentBox = { x: opponent.x, y: opponent.y, width: opponent.width, height: opponent.height };
        const selfBox = { x: this.x, y: this.y, width: this.width, height: this.height };
        if (
            !this.dashDamageApplied && !opponent.isSwallowed && !opponent.isStunned &&
            selfBox.x < opponentBox.x + opponentBox.width &&
            selfBox.x + selfBox.width > opponentBox.x &&
            selfBox.y < opponentBox.y + opponentBox.height &&
            selfBox.y + selfBox.height > opponentBox.y
        ) {
            opponent.takeDamage(BOLT_DASH_DAMAGE, moveDirection > 0);
            this.dashDamageApplied = true;
            screenShakeMagnitude = 5;
            screenShakeTimeLeft = 5;
            activeHitEffects.push({ text: "¡ZAS!", x: opponent.x + opponent.width/2, y: opponent.y + opponent.height/2, color: "#f39c12", alpha: 1.0, size: 25, rotation: 0, lifetime: HIT_EFFECT_LIFETIME });
        }

        if (Math.abs(this.x - this.dashTargetX) < BOLT_DASH_SPEED) {
            this.x = this.dashTargetX;
            this.dashCount--;

            if (this.dashCount <= 0) {
                this.isDashing = false;
                this.trail = [];
            } else {
                this.dashTargetX = this.dashTargetX === 0 ? CANVAS_WIDTH - this.width : 0;
                this.dashDamageApplied = false;
            }
        }
    }

    updateZanjasCrack() {
        if (!this.isCastingCrack) return;

        this.crackTimer--;
        if (this.crackTimer <= 0) {
            this.isCastingCrack = false;
            return;
        }

        const opponent = players.find(p => p !== this);
        if (!opponent || this.crackOpponentHit || opponent.isSwallowed) {
            return;
        }

        const crackActiveStart = ZANJAS_CRACK_LIFESPAN * 0.7;
        const crackActiveEnd = ZANJAS_CRACK_LIFESPAN * 0.2;

        if (this.crackTimer < crackActiveStart && this.crackTimer > crackActiveEnd) {
            const opponentCenterX = opponent.x + opponent.width / 2;
            
            if (Math.abs(opponentCenterX - this.crackCenterX) < ZANJAS_CRACK_WIDTH / 2 && (opponent.y + opponent.height) >= (CANVAS_HEIGHT - 10)) {
                opponent.takeDamage(ZANJAS_CRACK_DAMAGE, this.facingRight);
                opponent.isSwallowed = true;
                opponent.swallowedTimer = ZANJAS_SWALLOWED_DURATION;
                this.crackOpponentHit = true;

                activeHitEffects.push({
                    text: "¡TRAGADO!",
                    x: opponent.x + opponent.width / 2,
                    y: opponent.y + opponent.height / 2,
                    color: "#8B4513",
                    alpha: 1.0,
                    size: 40,
                    rotation: (Math.random() - 0.5) * 0.3,
                    lifetime: HIT_EFFECT_LIFETIME * 2
                });
                screenShakeMagnitude = 20;
                screenShakeTimeLeft = 30;
            }
        }
    }

    update() {
        if (this.isSwallowed) {
            this.swallowedTimer--;
            if (this.swallowedTimer <= 0) {
                this.isSwallowed = false;
                this.x = Math.random() * (CANVAS_WIDTH - this.width);
                this.y = -this.height; // Respawn en la parte superior
                this.velocityY = 0;
            }
            return; // Saltar actualización normal
        }
        
        if (this.isStunned) {
            this.stunTimer--;
            if (this.stunTimer <= 0) {
                this.isStunned = false;
            }
            return; // Saltar actualización normal
        }

        const opponent = players.find(p => p !== this);
        if (opponent) {
            this.updateTiaCoteBeam(opponent);
            this.updateHearts(opponent);
        }

        // AI logic for both players
        this.updateAI();
        
        if (this.isInvisible) {
            this.invisibilityTimer--;
            if (this.invisibilityTimer <= 0) {
                this.isInvisible = false;
                const opponent = players.find(p => p !== this);
                if (opponent) {
                    this.x = opponent.x + (opponent.facingRight ? opponent.width + 20 : -this.width - 20);
                    this.y = opponent.y;
                    if (this.x < 0) this.x = 10;
                    if (this.x + this.width > CANVAS_WIDTH) this.x = CANVAS_WIDTH - this.width - 10;
                }
            }
            return;
        }


        if (this.isDashing) {
            const opponent = players.find(p => p !== this);
            this.updateBoltDash(opponent);
             this.trail.push({ x: this.x, y: this.y });
            if (this.trail.length > 5) {
                this.trail.shift();
            }
            return;
        }

        
        this.x += this.velocityX;
        this.velocityY += GRAVITY;
        this.y += this.velocityY;
        
        if (opponent) {
            this.updatePiranhaProjectiles(opponent);
            this.updateMoneyWads(opponent);
            this.updateCoins(opponent);
            this.updateCalculatorProjectiles(opponent);
            this.updatePapers(opponent);
            this.updateKisses(opponent);
        }
        
        if (this.isCastingCrack) {
            this.updateZanjasCrack();
        }

        const actualGroundSurfaceY = CANVAS_HEIGHT - 10;
        if (this.y + this.height > actualGroundSurfaceY) {
            this.y = actualGroundSurfaceY - this.height;
            this.velocityY = 0;
            this.isJumping = false;
        }
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > CANVAS_WIDTH) this.x = CANVAS_WIDTH - this.width;
    }

    chargePowerOnClick() {
        if (this.isSuperCharged || !gameActive) return;
        
        if (window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(15);
        }

        const powerBarContainer = document.getElementById('player1PowerBarContainer');
        powerBarContainer.classList.remove('power-bar-container-flash'); // Remove to re-trigger animation
        void powerBarContainer.offsetWidth; // Trigger reflow
        powerBarContainer.classList.add('power-bar-container-flash');
        setTimeout(() => {
            powerBarContainer.classList.remove('power-bar-container-flash');
        }, 150);

        this.power += POWER_GAIN_PER_CLICK;
        if (this.power >= this.maxPower) {
            this.power = this.maxPower;
            this.isSuperCharged = true;
        }
        updatePowerBars();
    }


    jump() {
        if (!this.isJumping) {
            this.velocityY = -this.jumpStrength;
            this.isJumping = true;
        }
    }

    gainPower(amount) {
        if (this.isSuperCharged) return;
        this.power += amount;
        if (this.power >= this.maxPower) {
            this.power = this.maxPower;
            this.isSuperCharged = true;
            console.log((this.isPlayer1 ? "Player 1" : "Player 2") + " SUPER CARGADO!");
        }
        updatePowerBars();
    }

    launchPiranhaProjectiles() {
        const numPiranhas = PIRANHA_PROJECTILE_COUNT;
        const piranhaDamage = PIRANHA_PROJECTILE_DAMAGE;
        let handX, handY;

        const totalLegSegmentsHeight = this.thighHeight + this.lowerLegHeight;
        const shoulderX = this.x + (this.width - this.torsoWidth) / 2 + (this.facingRight ? this.torsoWidth * 0.70 : this.torsoWidth * 0.30);
        const shoulderY = this.y + (this.height - this.torsoHeight - totalLegSegmentsHeight - this.shoeHeight) + this.torsoHeight * 0.20;
        const armAngle = this.facingRight ? ARM_PUNCH_UPPER_EXTEND_ANGLE : Math.PI - ARM_PUNCH_UPPER_EXTEND_ANGLE;
        const forearmAngle = this.facingRight ? ARM_PUNCH_FOREARM_EXTEND_ANGLE : -ARM_PUNCH_FOREARM_EXTEND_ANGLE;
        const elbowX = shoulderX + Math.cos(armAngle) * this.upperArmLength;
        const elbowY = shoulderY + Math.sin(armAngle) * this.upperArmLength;
        handX = elbowX + Math.cos(armAngle + forearmAngle) * (this.foreArmLength + this.gloveSize * 0.25);
        handY = elbowY + Math.sin(armAngle + forearmAngle) * (this.foreArmLength + this.gloveSize * 0.25);


        for (let i = 0; i < numPiranhas; i++) {
            this.activePiranhaProjectiles.push({
                x: handX + (this.facingRight ? this.gloveSize / 2 : -this.gloveSize/2 - PIRANHA_PROJECTILE_WIDTH),
                y: handY - PIRANHA_PROJECTILE_HEIGHT / 2 + (i * (PIRANHA_PROJECTILE_HEIGHT / 1.5)) - (PIRANHA_PROJECTILE_HEIGHT/3 * (numPiranhas-1)/2) ,
                width: PIRANHA_PROJECTILE_WIDTH,
                height: PIRANHA_PROJECTILE_HEIGHT,
                velocityX: PIRANHA_PROJECTILE_SPEED,
                direction: this.facingRight,
                lifespan: PIRANHA_PROJECTILE_LIFESPAN,
                damage: piranhaDamage
            });
        }
    }

    launchMoneyWadAttack() {
        const opponent = players.find(p => p !== this);
        if (!opponent) return;

        // MONEY_RAIN_COUNT es el número de grupos de billetes que caerán.
        for (let i = 0; i < MONEY_RAIN_COUNT; i++) {
            const clusterCenterX = opponent.x + opponent.width / 2 + (Math.random() - 0.5) * opponent.width;
            const clusterStartY = MONEY_RAIN_INITIAL_Y - (Math.random() * CANVAS_HEIGHT / 2);
            
            // Crea un grupo de 3 fajos de billetes
            for (let j = 0; j < 3; j++) {
                this.activeMoneyWads.push({
                    x: clusterCenterX + (Math.random() - 0.5) * 40,
                    y: clusterStartY + (Math.random() - 0.5) * 40,
                    width: MONEY_RAIN_WAD_WIDTH,
                    height: MONEY_RAIN_WAD_HEIGHT,
                    velocityX: (Math.random() - 0.5) * 2,
                    velocityY: Math.random() * 4 + 3,
                    rotation: (Math.random() - 0.5) * Math.PI,
                    rotationSpeed: (Math.random() - 0.5) * 0.1,
                    damage: MONEY_RAIN_DAMAGE,
                });
            }

            // Crea un grupo de 5 monedas por cada grupo de billetes
            for (let k = 0; k < 5; k++) {
                this.activeCoins.push({
                    x: clusterCenterX + (Math.random() - 0.5) * 60,
                    y: clusterStartY + (Math.random() - 0.5) * 60,
                    radius: Math.random() * 5 + 5, // radio entre 5 y 10
                    velocityY: Math.random() * 5 + 4,
                    damage: COIN_RAIN_DAMAGE
                });
            }
        }
    }

    launchCalculatorAttack() {
        const opponent = players.find(p => p !== this);
        if (!opponent) return;

        for (let i = 0; i < CALCULATOR_PROJECTILE_COUNT; i++) {
            this.activeCalculators.push({
                x: opponent.x + (Math.random() - 0.5) * opponent.width, // Centrado en el oponente con dispersión
                y: CALCULATOR_INITIAL_Y - (Math.random() * 100), // Comienza arriba de la pantalla
                width: CALCULATOR_PROJECTILE_WIDTH,
                height: CALCULATOR_PROJECTILE_HEIGHT,
                velocityX: (Math.random() - 0.5) * 2, // Ligero desvío horizontal
                velocityY: (Math.random() * 2) + 2,    // Velocidad inicial hacia abajo
                rotation: (Math.random() - 0.5) * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.2,
                lifespan: CALCULATOR_PROJECTILE_LIFESPAN,
                damage: CALCULATOR_PROJECTILE_DAMAGE
            });
        }
    }

    launchPapeluchoAttack() {
        const opponent = players.find(p => p !== this);
        if (!opponent) return;
        
        for (let i = 0; i < PAPELUCHO_PAPER_COUNT; i++) {
            // Centra la lluvia de papeles sobre el oponente con algo de dispersión
            const spawnX = opponent.x + (opponent.width / 2) + (Math.random() - 0.5) * (opponent.width * 2.5);

            this.activePapers.push({
                x: spawnX,
                y: -PAPELUCHO_PAPER_HEIGHT - Math.random() * 300, // Empiezan a caer desde arriba
                width: PAPELUCHO_PAPER_HEIGHT,
                height: PAPELUCHO_PAPER_HEIGHT,
                velocityX: (Math.random() - 0.5) * 4, // Se mueven un poco a los lados
                velocityY: (Math.random() * 2) + 2, // Velocidad de caída inicial
                rotation: (Math.random() - 0.5) * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.2,
                lifespan: 250,
                isPowerPoint: i === 0 // El primer papel será el especial
            });
        }
    }

    launchOrsiniLoveAttack() {
        let handX, handY;
        const totalLegSegmentsHeight = this.thighHeight + this.lowerLegHeight;
        const shoulderX = this.x + (this.width - this.torsoWidth) / 2 + (this.facingRight ? this.torsoWidth * 0.70 : this.torsoWidth * 0.30);
        const shoulderY = this.y + (this.height - this.torsoHeight - totalLegSegmentsHeight - this.shoeHeight) + this.torsoHeight * 0.20;
        const armAngle = this.facingRight ? ARM_PUNCH_UPPER_EXTEND_ANGLE : Math.PI - ARM_PUNCH_UPPER_EXTEND_ANGLE;
        const forearmAngle = this.facingRight ? ARM_PUNCH_FOREARM_EXTEND_ANGLE : -ARM_PUNCH_FOREARM_EXTEND_ANGLE;
        const elbowX = shoulderX + Math.cos(armAngle) * this.upperArmLength;
        const elbowY = shoulderY + Math.sin(armAngle) * this.upperArmLength;
        handX = elbowX + Math.cos(armAngle + forearmAngle) * (this.foreArmLength + this.gloveSize * 0.25);
        handY = elbowY + Math.sin(armAngle + forearmAngle) * (this.foreArmLength + this.gloveSize * 0.25);

        for (let i = 0; i < ORSINI_KISS_COUNT; i++) {
            this.activeKisses.push({
                x: handX,
                y: handY,
                width: ORSINI_KISS_WIDTH,
                height: ORSINI_KISS_HEIGHT,
                velocityX: ORSINI_KISS_SPEED + (i * 2), // El segundo beso es un poco más rápido
                direction: this.facingRight,
                lifespan: ORSINI_KISS_LIFESPAN,
                damage: ORSINI_KISS_DAMAGE
            });
        }
    }

    launchEscapeRoomJacksonAttack() {
        const opponent = players.find(p => p !== this);
        if (!opponent) return;

        this.isInvisible = true;
        this.invisibilityTimer = JACKSON_INVISIBILITY_DURATION;
        opponent.isConfused = true;
        opponent.confusionTimer = JACKSON_CONFUSION_DURATION;

        new Audio('audio/smoke-bomb.wav').play().catch(e => console.error("Error playing sound:", e));

        // Crear efecto de bomba de humo
        for (let i = 0; i < SMOKE_PARTICLE_COUNT; i++) {
            smokeParticles.push({
                x: this.x + this.width / 2,
                y: this.y + this.height / 2,
                radius: Math.random() * 20 + 10,
                alpha: 1,
                velocityX: (Math.random() - 0.5) * 4,
                velocityY: (Math.random() - 0.5) * 4
            });
        }
        
        this.x = -1000; // Mover fuera de la pantalla
    }
    
    // Método para lanzar el ataque de Tía Cote
    launchTiaCoteBeamAttack() {
        this.isCastingBeam = true;
        this.beamTimer = TIA_COTE_BEAM_DURATION;
        this.isPerformingSuperAttackAnimation = true; // Activa el brillo y la pose
        this.attackVisualActive = true;
        screenShakeMagnitude = 8; // Un buen temblor de pantalla
        screenShakeTimeLeft = TIA_COTE_BEAM_DURATION;
        new Audio('audio/angelic-choir.wav').play().catch(e => console.error("Error playing sound:", e));

        // Lanza los corazones desde las manos
        const totalLegSegmentsHeight = this.thighHeight + this.lowerLegHeight;
        const shoulderX = this.x + (this.width - this.torsoWidth) / 2 + (this.facingRight ? this.torsoWidth * 0.70 : this.torsoWidth * 0.30);
        const shoulderY = this.y + (this.height - this.torsoHeight - totalLegSegmentsHeight - this.shoeHeight) + this.torsoHeight * 0.20;
        const armAngle = this.facingRight ? -Math.PI / 16 : Math.PI + Math.PI / 16;
        const forearmAngle = 0;
        const elbowX = shoulderX + Math.cos(armAngle) * this.upperArmLength;
        const elbowY = shoulderY + Math.sin(armAngle) * this.upperArmLength;
        const handX = elbowX + Math.cos(armAngle + forearmAngle) * (this.foreArmLength + this.gloveSize * 0.25);
        const handY = elbowY + Math.sin(armAngle + forearmAngle) * (this.foreArmLength + this.gloveSize * 0.25);


        for (let i = 0; i < TIA_COTE_HEART_COUNT; i++) {
            this.activeHearts.push({
                x: handX,
                y: handY,
                width: TIA_COTE_HEART_WIDTH,
                height: TIA_COTE_HEART_HEIGHT,
                velocityX: (this.facingRight ? 1 : -1) * TIA_COTE_HEART_SPEED + (Math.random() - 0.5) * 4, // Añade dispersión
                velocityY: (Math.random() - 0.5) * 6, // Dispersión vertical
                lifespan: TIA_COTE_HEART_LIFESPAN,
                damage: TIA_COTE_HEART_DAMAGE
            });
        }
    }

    launchBoltDashAttack() {
        this.isDashing = true;
        this.dashCount = BOLT_DASH_COUNT;
        this.dashTargetX = this.x > CANVAS_WIDTH / 2 ? 0 : CANVAS_WIDTH - this.width;
        this.dashDamageApplied = false;
        this.velocityY = 0; // Ignore gravity during dash
        this.trail = [];
    }
    
    launchZanjasAttack() {
        const opponent = players.find(p => p !== this);
        if (!opponent) return;
        this.isCastingCrack = true;
        this.crackTimer = ZANJAS_CRACK_LIFESPAN;
        this.crackOpponentHit = false;
        this.crackCenterX = opponent.x + opponent.width / 2;
    }


    _performAttack(isKickMove) {
        if (this.isPunching || this.isKicking || this.isCastingBeam || (Date.now() - this.lastAttackTime < this.attackCooldown)) return;

        let currentDamage;
        let currentRange = isKickMove ? this.kickRange : this.punchRange;
        this.isPerformingSuperAttackAnimation = false;

        let isSuperMove = this.isSuperCharged;

        if (isSuperMove) {
            
            currentDamage = isKickMove ? SUPER_KICK_DAMAGE : SUPER_PUNCH_DAMAGE;
            this.isPerformingSuperAttackAnimation = true;
            console.log((this.isPlayer1 ? "Player 1" : "Player 2") + " USES SUPER!");

            if (this.name === "Piraña") {
                new Audio('audio/hadouken.wav').play().catch(e => console.error("Error al reproducir sonido:", e));
                this.launchPiranhaProjectiles();
                currentDamage = 0;
            } else if (this.name === "La Ex") {
                this.launchMoneyWadAttack();
                currentDamage = 0;
            } else if (this.name === "Burric") {
                this.launchCalculatorAttack();
                currentDamage = 0;
            } else if (this.name === "Matthei Bolt") {
                this.launchBoltDashAttack();
                currentDamage = 0;
            } else if (this.name === "El Zanjas") {
                this.launchZanjasAttack();
                currentDamage = 0;
            } else if (this.name === "Carolina Papelucho") {
                this.launchPapeluchoAttack();
                currentDamage = 0;
            } else if (this.name === "Orsini Love") {
                this.launchOrsiniLoveAttack();
                currentDamage = 0;
            } else if (this.name === "Escape Room Jackson") {
                this.launchEscapeRoomJacksonAttack();
                currentDamage = 0;
            } else if (this.name === "Tía Cote") {
                this.launchTiaCoteBeamAttack();
                currentDamage = 0;
            } else {
                // Sonido genérico para otros superataques
                new Audio('audio/38H.wav').play().catch(e => console.error("Error playing sound:", e));
            }
        } else {
            currentDamage = isKickMove ? this.kickDamage : this.punchDamage;
        }

        if (isKickMove) {
            this.isKicking = true;
        } else {
            this.isPunching = true;
            this.attackArm = this.nextPunchArm;
            this.nextPunchArm = (this.nextPunchArm === 'right' ? 'left' : 'right');
        }
        this.attackVisualActive = true;
        this.lastAttackTime = Date.now();
        setTimeout(() => {
            if (isKickMove) this.isKicking = false;
            else this.isPunching = false;
            this.attackArm = null;
            if (isSuperMove && !this.isCastingBeam) this.isPerformingSuperAttackAnimation = false;
        }, ATTACK_LOGIC_DURATION);
        setTimeout(() => {
            if(!this.isCastingBeam) this.attackVisualActive = false;
        }, ATTACK_ANIMATION_DURATION);

        const opponent = players.find(p => p !== this);
        if (!opponent || opponent.isSwallowed) return;

        let attackHitbox;
        const totalLegSegmentsHeight = this.thighHeight + this.lowerLegHeight;

        if (isKickMove) {
            const angleOfAttack = this.facingRight ? LEG_ANGLE_KICK_STRIKE : Math.PI - LEG_ANGLE_KICK_STRIKE;
            const limbLength = totalLegSegmentsHeight + this.shoeHeight / 2;
            const hipY = this.y + (this.height - this.torsoHeight - totalLegSegmentsHeight - this.shoeHeight) + this.torsoHeight;
            const kickingLegDrawArg = this.facingRight;
            const hipXOffsetFactorForKickingLeg = kickingLegDrawArg ? 0.65 : 0.35;
            const hipX = this.x + (this.width - this.torsoWidth) / 2 +
                         (this.facingRight ? this.torsoWidth * hipXOffsetFactorForKickingLeg
                                           : this.torsoWidth * (1 - hipXOffsetFactorForKickingLeg));
            const attackEndX = hipX + Math.cos(angleOfAttack) * limbLength * 0.9;
            const attackEndY = hipY + Math.sin(angleOfAttack) * limbLength * 0.9;
            attackHitbox = { x: attackEndX - currentRange / 2, y: attackEndY - currentRange / 2, width: currentRange, height: currentRange };
        } else {
            let shoulderXOffsetFactor;
            if (this.facingRight) {
                shoulderXOffsetFactor = (this.attackArm === 'right') ? 0.30 : 0.70;
            } else {
                shoulderXOffsetFactor = (this.attackArm === 'left') ? 0.30 : 0.70;
            }
            const shoulderX = this.x + (this.width - this.torsoWidth) / 2 + this.torsoWidth * shoulderXOffsetFactor;
            const shoulderY = this.y + (this.height - this.torsoHeight - totalLegSegmentsHeight - this.shoeHeight) + this.torsoHeight * 0.20;
            let upperArmHitboxAngle = this.facingRight ? ARM_PUNCH_UPPER_EXTEND_ANGLE : Math.PI - ARM_PUNCH_UPPER_EXTEND_ANGLE;
            let foreArmHitboxAngle = this.facingRight ? ARM_PUNCH_FOREARM_EXTEND_ANGLE : -ARM_PUNCH_FOREARM_EXTEND_ANGLE;
            const elbowX = shoulderX + Math.cos(upperArmHitboxAngle) * this.upperArmLength;
            const elbowY = shoulderY + Math.sin(upperArmHitboxAngle) * this.upperArmLength;
            const attackEndX = elbowX + Math.cos(upperArmHitboxAngle + foreArmHitboxAngle) * (this.foreArmLength + this.gloveSize * 0.5);
            const attackEndY = elbowY + Math.sin(upperArmHitboxAngle + foreArmHitboxAngle) * (this.foreArmLength + this.gloveSize * 0.5);
            attackHitbox = { x: attackEndX - currentRange / 2, y: attackEndY - currentRange / 2, width: currentRange, height: currentRange };
        }
        const opponentBox = { x: opponent.x, y: opponent.y, width: opponent.width, height: opponent.height };

        if (!isSuperMove || (isSuperMove && this.name !== "Piraña" && this.name !== "La Ex" && this.name !== "Burric" && this.name !== "Matthei Bolt" && this.name !== "El Zanjas" && this.name !== "Carolina Papelucho" && this.name !== "Orsini Love" && this.name !== "Escape Room Jackson" && this.name !== "Tía Cote")) {
             if (
                attackHitbox.x < opponentBox.x + opponentBox.width &&
                attackHitbox.x + attackHitbox.width > opponentBox.x &&
                attackHitbox.y < opponentBox.y + opponentBox.height &&
                attackHitbox.y + attackHitbox.height > opponentBox.y
            ) {
                opponent.takeDamage(currentDamage, this.facingRight);
                if (!isSuperMove) {
                   this.gainPower(POWER_GAIN_PER_HIT);
                } else {
                    this.power = 0;
                    this.isSuperCharged = false;
                    updatePowerBars();
                    activeHitEffects.push({
                        text: "¡SÚPER!",
                        x: opponent.x + opponent.width / 2 + (Math.random() - 0.5) * 30,
                        y: opponent.y + opponent.height / 2 + (Math.random() - 0.5) * 30,
                        color: "#FF00FF",
                        alpha: 1.0,
                        size: 50 + Math.random() * 20,
                        rotation: (Math.random() - 0.5) * 0.8,
                        lifetime: HIT_EFFECT_LIFETIME * 3
                    });
                    screenShakeMagnitude = 15;
                    screenShakeTimeLeft = 20;
                }
            } else {
                if (isSuperMove) {
                    this.power = 0;
                    this.isSuperCharged = false;
                    updatePowerBars();
                    console.log((this.isPlayer1 ? "Player 1" : "Player 2") + " SUPER MISSED! Power reset.");
                }
            }
        } else if (isSuperMove) {
            this.power = 0;
            this.isSuperCharged = false;
            updatePowerBars();
            let hitEffectText = "";
            let hitEffectColor = "";
            if (this.name === "Piraña") {
               hitEffectText = "¡PIRAÑAS!";
               hitEffectColor = "#00ced1";
            } else if (this.name === "La Ex") {
               hitEffectText = "¡Estoy forrada!";
               hitEffectColor = "#22c55e";
            } else if (this.name === "Burric") {
               hitEffectText = "¡No tengo la cifra exacta!";
               hitEffectColor = "#8d99ae";
            } else if (this.name === "Matthei Bolt") {
                hitEffectText = "¡A CORRER!";
                hitEffectColor = "#f39c12";
            } else if (this.name === "El Zanjas") {
                hitEffectText = "¡SuperZanja!";
                hitEffectColor = "#8B4513";
            } else if (this.name === "Carolina Papelucho") {
                hitEffectText = "Te lo explico en una presentación!";
                hitEffectColor = "#ff8c00";
            } else if (this.name === "Orsini Love") {
                hitEffectText = "Uno pa' Jackson, uno pa' ti";
                hitEffectColor = "#ff69b4";
            } else if (this.name === "Escape Room Jackson") {
                hitEffectText = "¡Salida de Emergencia!";
                hitEffectColor = "#adb5bd";
            } else if (this.name === "Tía Cote") {
                hitEffectText = "¡Bendiciones!";
                hitEffectColor = "#e879f9";
            }
            activeHitEffects.push({ text: hitEffectText, x: this.x + this.width/2, y: this.y, color: hitEffectColor, size: 30, lifetime: HIT_EFFECT_LIFETIME * 1.5, rotation: (Math.random() - 0.5) * 0.2, alpha: 1});
            screenShakeMagnitude = 10;
            screenShakeTimeLeft = 15;
        }
    }

    punch() { this._performAttack(false); }
    kick() { this._performAttack(true); }

    takeDamage(damage, attackerFacingRight) {
        if(this.isDashing || this.isSwallowed) return; // Invulnerable durante el dash o tragado
        this.health -= damage;
        if (this.health < 0) this.health = 0;
        
        new Audio('audio/2BH.wav').play().catch(e => console.error("Error playing sound:", e));

        if (!this.isSwallowed) {
            this.velocityX = 0; // Detener el movimiento horizontal al ser golpeado por el rayo
            if(!this.isCastingBeam) { // Solo aplicar knockback si no es el rayo el que golpea
                this.x += attackerFacingRight ? this.knockbackStrength : -this.knockbackStrength;
                if (this.x < 0) this.x = 0;
                if (this.x + this.width > CANVAS_WIDTH) this.x = CANVAS_WIDTH - this.width;
            }
            this.velocityY = -this.knockbackStrength / 2.5;
        }

        const randomWord = hitWords[Math.floor(Math.random() * hitWords.length)];
        const randomColor = hitWordColors[Math.floor(Math.random() * hitWordColors.length)];
        activeHitEffects.push({
            text: randomWord,
            x: this.x + this.width / 2 + (Math.random() - 0.5) * 20,
            y: this.y + this.height / 3 + (Math.random() - 0.5) * 20,
            color: randomColor, alpha: 1.0, size: 24 + Math.random() * 16,
            rotation: (Math.random() - 0.5) * 0.5,
            lifetime: HIT_EFFECT_LIFETIME
        });
        updateHealthBars();
        checkGameOver();
    }
}

function createCharacterSelectionUI() {
    characterGrid.innerHTML = '';
    characterAssets.forEach((charAsset, index) => {
        const portraitWrapper = document.createElement('div');
        portraitWrapper.classList.add('character-portrait', 'rounded-lg', 'overflow-hidden', 'p-1');
        portraitWrapper.dataset.charIndex = index;

        const imgEl = document.createElement('img');
        imgEl.src = charAsset.previewImage;
        imgEl.alt = charAsset.name;
        imgEl.onerror = () => { imgEl.src = `https://placehold.co/100x100/2d3748/e0e0e0?text=${charAsset.name.substring(0,3)}`; };
        portraitWrapper.appendChild(imgEl);

        const namePlate = document.createElement('div');
        namePlate.classList.add('character-name-plate');
        namePlate.textContent = charAsset.name;
        portraitWrapper.appendChild(namePlate);

        portraitWrapper.addEventListener('click', () => handleCharacterSelect(index));
        characterGrid.appendChild(portraitWrapper);
    });
    startButton.disabled = true;
}

// Inicia el efecto de ruleta para la selección del PC.
function startPCSelectionRoulette() {
    // Desactiva los clics en los retratos durante la ruleta para evitar interferencias.
    characterGrid.style.pointerEvents = 'none';

    // Crea una lista de índices de personajes disponibles (todos excepto el elegido por el jugador).
    let availableChars = characterAssets.map((_, i) => i).filter(i => i !== playerSelectedCharIndex);
    let rouletteIndex = 0;
    let lastHighlightedIndex = -1;

    // Inicia un intervalo que se ejecuta rápidamente para simular el efecto de ruleta.
    pcSelectionInterval = setInterval(() => {
        // Quita el brillo del personaje anteriormente resaltado.
        if (lastHighlightedIndex !== -1) {
            document.querySelector(`[data-char-index='${lastHighlightedIndex}']`).classList.remove('selected-p2');
        }

        // Obtiene el índice del personaje a resaltar en esta iteración.
        const charToHighlightIndex = availableChars[rouletteIndex];

        // Aplica el brillo azul al retrato del personaje actual.
        const portrait = document.querySelector(`[data-char-index='${charToHighlightIndex}']`);
        if (portrait) {
            portrait.classList.add('selected-p2');
        }
        // Reproduce el sonido de selección.
        new Audio('audio/20H.wav').play().catch(e => console.error("Error playing sound:", e));

        // Actualiza la imagen y el nombre en el display del PC en tiempo real.
        const currentAsset = characterAssets[charToHighlightIndex];
        p2SelectedCharImg.src = currentAsset.previewImage;
        p2SelectedCharName.textContent = currentAsset.name;

        lastHighlightedIndex = charToHighlightIndex;

        // Pasa al siguiente personaje en la lista de disponibles.
        rouletteIndex++;
        if (rouletteIndex >= availableChars.length) {
            rouletteIndex = 0; // Vuelve al inicio si llega al final.
        }
    }, 120); // Intervalo de 120ms para un efecto rápido.

    // Define una duración aleatoria para la ruleta (entre 2 y 3 segundos).
    const rouletteDuration = 2000 + Math.random() * 1000;
    
    // Detiene la ruleta después del tiempo definido.
    setTimeout(() => {
        clearInterval(pcSelectionInterval);

        // El personaje final del PC es el último que fue resaltado.
        pcSelectedCharIndex = lastHighlightedIndex;
        
        const pcAsset = characterAssets[pcSelectedCharIndex];
        p2SelectedCharImg.src = pcAsset.previewImage;
        p2SelectedCharName.textContent = pcAsset.name;

        // Se asegura de que solo el personaje final tenga el brillo.
        document.querySelectorAll('.character-portrait.selected-p2').forEach(el => el.classList.remove('selected-p2'));
        const finalPortrait = document.querySelector(`[data-char-index='${pcSelectedCharIndex}']`);
        if (finalPortrait) {
            finalPortrait.classList.add('selected-p2');
        }

        // Actualiza el mensaje y activa el botón de inicio.
        selectionPrompt.textContent = "¡Listo para luchar!";
        selectionPrompt.classList.remove('text-yellow-200');
        selectionPrompt.classList.add('text-green-400');
        startButton.disabled = false;
        
        // Reactiva los clics en los retratos.
        characterGrid.style.pointerEvents = 'auto';

    }, rouletteDuration);
}


// Gestiona la selección de personaje del jugador e inicia la del PC.
function handleCharacterSelect(index) {
    // Si el jugador ya eligió, no hace nada.
    if (playerSelectedCharIndex !== -1) return;

    // Reproduce el sonido de selección.
    new Audio('audio/20H.wav').play().catch(e => console.error("Error playing sound:", e));

    // Registra la selección del jugador y actualiza la UI.
    playerSelectedCharIndex = index;
    const playerAsset = characterAssets[index];
    p1SelectedCharImg.src = playerAsset.previewImage;
    p1SelectedCharName.textContent = playerAsset.name;
    const playerPortrait = document.querySelector(`[data-char-index='${index}']`);
    if (playerPortrait) {
        playerPortrait.classList.add('selected-p1');
    }
    
    selectionPrompt.textContent = "El PC está eligiendo...";
    
    // Inicia la ruleta de selección para el PC.
    startPCSelectionRoulette();
}


function initGame() {
    if (playerSelectedCharIndex === -1 || pcSelectedCharIndex === -1) {
        console.warn("Un personaje debe ser seleccionado.");
        return;
    }
    const playerAsset = characterAssets[playerSelectedCharIndex];
    const pcAsset = characterAssets[pcSelectedCharIndex];

    activeHitEffects = [];
    players = [
        new Player(100, CANVAS_HEIGHT, playerAsset, true, true), // Player 1 (Human)
        new Player(CANVAS_WIDTH - 150, CANVAS_HEIGHT, pcAsset, false, false) // Player 2 (PC)
    ];
    
    players.forEach(p => {
        p.power = 0;
        p.isSuperCharged = false;
        p.isPerformingSuperAttackAnimation = false;
        p.activePiranhaProjectiles = [];
        p.activeMoneyWads = [];
        p.activeCoins = [];
        p.activeCalculators = [];
        p.activePapers = [];
        p.activeKisses = [];
        p.activeHearts = [];
        p.isDashing = false;
        p.trail = [];
        p.isCastingCrack = false;
        p.crackTimer = 0;
        p.crackOpponentHit = false;
        p.isSwallowed = false;
        p.swallowedTimer = 0;
        p.isStunned = false;
        p.stunTimer = 0;
        p.isCastingBeam = false;
        p.beamTimer = 0;
    });

    player1NameDisplay.textContent = players[0].name;
    player2NameDisplay.textContent = players[1].name;
    updateHealthBars();
    updatePowerBars();
    gameActive = true;
    gameOverModal.classList.add('hidden');
    controlsPanel.style.display = 'none';
    mainHeader.style.display = 'none';
    battleFooter.style.display = 'block';

    // Set canvas background for the fight
    const possibleBgs = [
        ...(characterBackgrounds[playerAsset.name] || []),
        ...(characterBackgrounds[pcAsset.name] || [])
    ];
    
    if (possibleBgs.length > 0) {
        const selectedBg = possibleBgs[Math.floor(Math.random() * possibleBgs.length)];
        canvas.style.backgroundImage = `url('${selectedBg}')`;
        canvas.style.backgroundSize = 'cover';
        canvas.style.backgroundPosition = 'center';
    }
    
    const startMessageOverlay = document.getElementById('start-message-overlay');
    const startMessageText = document.getElementById('start-message-text');
    startMessageText.textContent = "¡Haz tus clicks para recargar Superpoder!";
    startMessageOverlay.classList.remove('hidden');

    setTimeout(() => {
        startMessageOverlay.classList.add('hidden');
    }, 3000); 

    if (!backgroundMusic) {
        backgroundMusic = new Audio('audio/playbackbattle.mp3');
        backgroundMusic.loop = true;
    }
    backgroundMusic.play().catch(error => console.warn("Error al reproducir música:", error));
    
    gameUiTop.style.visibility = 'visible';
    gameLoop();
}

// Resetea la pantalla de selección a su estado inicial.
function resetSelectionScreen() {
    gameOverModal.classList.add('hidden');
    controlsPanel.style.display = 'block';
    mainHeader.style.display = 'block';
    gameUiTop.style.visibility = 'hidden';
    battleFooter.style.display = 'none';
    
    // Detiene la ruleta del PC si se estaba ejecutando.
    if (pcSelectionInterval) {
        clearInterval(pcSelectionInterval);
    }
    // Se asegura de que los retratos sean clickeables de nuevo.
    characterGrid.style.pointerEvents = 'auto';

    playerSelectedCharIndex = -1;
    pcSelectedCharIndex = -1;

    p1SelectedCharImg.src = "https://placehold.co/120x120/455a64/e0e0e0?text=P1";
    p1SelectedCharImg.alt = "P1 Seleccionado";
    p1SelectedCharName.textContent = "- Vacío -";
    player1NameDisplay.textContent = "JUGADOR";

    p2SelectedCharImg.src = "https://placehold.co/120x120/455a64/e0e0e0?text=PC";
    p2SelectedCharImg.alt = "PC Seleccionado";
    p2SelectedCharName.textContent = "- Al Azar -";
    player2NameDisplay.textContent = "PC";

    document.querySelectorAll('.character-portrait').forEach(el => {
        el.classList.remove('selected-p1', 'selected-p2');
    });
    
    selectionPrompt.textContent = "Elige tu luchador para empezar";
    selectionPrompt.classList.add('text-yellow-200');
    selectionPrompt.classList.remove('text-green-400');
    startButton.disabled = true;

    if (backgroundMusic) {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
    }
    if (player1PowerBar) player1PowerBar.style.width = '0%';
    if (player2PowerBar) player2PowerBar.style.width = '0%';
    if (player1PowerBar) player1PowerBar.classList.remove('super-charged');
    if (player2PowerBar) player2PowerBar.classList.remove('super-charged');

    // Clear canvas background and redraw default
    canvas.style.backgroundImage = 'none';
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = 'rgba(45, 55, 72, 0.5)';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = '#4a5568';
    ctx.fillRect(0, CANVAS_HEIGHT - 10, CANVAS_WIDTH, 10);
}

function updateHealthBars() {
    if (players.length < 2) return;
    player1HealthBar.style.width = `${(players[0].health / players[0].maxHealth) * 100}%`;
    player2HealthBar.style.width = `${(players[1].health / players[1].maxHealth) * 100}%`;
}

function updatePowerBars() {
    if (players.length < 2) return;
    player1PowerBar.style.width = `${(players[0].power / players[0].maxPower) * 100}%`;
    player2PowerBar.style.width = `${(players[1].power / players[1].maxPower) * 100}%`;

    if (players[0].isSuperCharged) {
        player1PowerBar.classList.add('super-charged');
    } else {
        player1PowerBar.classList.remove('super-charged');
    }
    if (players[1].isSuperCharged) {
        player2PowerBar.classList.add('super-charged');
    } else {
        player2PowerBar.classList.remove('super-charged');
    }
}

function isAnySuperPowerActive() {
    for (const player of players) {
        if (player.isDashing || player.isCastingCrack || player.isSwallowed || player.isStunned || player.isCastingBeam ||
            player.activePiranhaProjectiles.length > 0 ||
            player.activeMoneyWads.length > 0 ||
            player.activeCalculators.length > 0 ||
            player.activeKisses.length > 0 ||
            player.activeHearts.length > 0 ||
            player.activePapers.length > 0) {
            return true; // Se encontró un superpoder activo
        }
    }
    return false; // No hay superpoderes activos
}

function checkGameOver() {
    if (players.length < 2) return;
    
    // Si la vida de un jugador llega a cero, pero un superpoder está activo, no termines el juego todavía.
    if ((players[0].health <= 0 || players[1].health <= 0) && isAnySuperPowerActive()) {
        return;
    }

    let winner = null;
    let winnerAsset = null;

    if (players[0].health <= 0 && players[1].health <= 0) {
         winnerMessage.innerHTML = `<span class="text-4xl font-bold text-yellow-400">¡EMPATE!</span>`;
    } else if (players[1].health <= 0) {
        winner = players[0];
        winnerAsset = characterAssets[playerSelectedCharIndex];
    } else if (players[0].health <= 0) {
        winner = players[1];
         winnerAsset = characterAssets[pcSelectedCharIndex];
    }

    if (winner || (players[0].health <= 0 && players[1].health <= 0)) {
        gameActive = false;
        new Audio('audio/9BH.wav').play().catch(e => console.error("Error playing sound:", e));
        gameOverModal.classList.remove('hidden');
        document.getElementById('start-message-overlay').classList.add('hidden');
        gameOverMessage.textContent = "¡Fin del Combate!";

        if (winner && winnerAsset) {
            winnerMessage.innerHTML = `
                <p class="text-2xl mb-4">El ganador es</p>
                <img src="${winnerAsset.previewImage}" onerror="this.src='https://placehold.co/120x120/455a64/e0e0e0?text=WIN'" class="w-32 h-32 mx-auto rounded-full border-4 border-yellow-400 mb-4 object-contain" style="image-rendering: pixelated;"/>
                <p class="text-4xl font-bold text-yellow-400">${winner.name.toUpperCase()}</p>
            `;
        }

        if (backgroundMusic) {
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
        }
    }
}

function drawHitEffects() {
    for (let i = activeHitEffects.length - 1; i >= 0; i--) {
        const effect = activeHitEffects[i];
        ctx.save();
        ctx.font = `bold ${effect.size}px 'Comic Sans MS', 'Arial', sans-serif`;
        ctx.fillStyle = effect.color;
        ctx.globalAlpha = effect.alpha;
        ctx.textAlign = 'center';
        ctx.translate(effect.x, effect.y);
        ctx.rotate(effect.rotation);
        ctx.fillText(effect.text, 0, 0);
        ctx.restore();
        effect.lifetime--;
        effect.alpha -= (1.0 / (effect.lifetime + 1));
        effect.y -= 0.5;
        effect.size *= 0.99;
        if (effect.lifetime <= 0) {
            activeHitEffects.splice(i, 1);
        }
    }
}

function drawSmoke() {
    for (let i = smokeParticles.length - 1; i >= 0; i--) {
        const p = smokeParticles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(108, 117, 125, ${p.alpha})`;
        ctx.fill();
        p.x += p.velocityX;
        p.y += p.velocityY;
        p.alpha -= 0.02;
        p.radius += 0.5;
        if (p.alpha <= 0) {
            smokeParticles.splice(i, 1);
        }
    }
}


function gameLoop() {
    let offsetX = 0;
    let offsetY = 0;

    if (screenShakeTimeLeft > 0) {
        offsetX = (Math.random() - 0.5) * 2 * screenShakeMagnitude;
        offsetY = (Math.random() - 0.5) * 2 * screenShakeMagnitude;
        ctx.translate(offsetX, offsetY);
        screenShakeTimeLeft--;
        if(screenShakeTimeLeft <= 0) {
            screenShakeMagnitude = 0;
        }
    }

    if (!gameActive) {
        if (offsetX !== 0 || offsetY !== 0) {
            ctx.translate(-offsetX, -offsetY);
        }
        return;
    }
    ctx.clearRect(-CANVAS_WIDTH, -CANVAS_HEIGHT, CANVAS_WIDTH*2, CANVAS_HEIGHT*2);
    ctx.fillStyle = '#4a5568';
    ctx.fillRect(0, CANVAS_HEIGHT - 10, CANVAS_WIDTH, 10);
    players.forEach(player => { player.update(); player.draw(); });
    drawHitEffects();
    drawSmoke();

    if (offsetX !== 0 || offsetY !== 0) {
        ctx.translate(-offsetX, -offsetY);
    }
    requestAnimationFrame(gameLoop);
}

// --- Lógica del Splash Screen ---
continueButton.addEventListener('click', () => {
    splashScreen.style.display = 'none';
    gameWrapper.style.display = 'flex';
    mainHeader.style.display = 'block';
    document.body.style.overflow = 'auto'; // Restaura el scroll si es necesario
});

restartButton.addEventListener('click', () => {
    resetSelectionScreen();
});

startButton.addEventListener('click', initGame);

canvas.addEventListener('click', () => {
    if (gameActive && players.length > 0) {
        players[0].chargePowerOnClick();
    }
});


window.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && gameActive && players.length > 0 && players[0].isSuperCharged) {
        event.preventDefault(); // Evita que la página se desplace al presionar espacio
        players[0].punch(); // Usa punch() para activar la lógica del superpoder
    }
});


createCharacterSelectionUI();
resetSelectionScreen();

backgroundMusic = new Audio('audio/playbackbattle.mp3');
backgroundMusic.loop = true;
backgroundMusic.pause();
backgroundMusic.currentTime = 0;
