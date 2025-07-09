//======================================================================
// 1. OBTENCIÓN DE ELEMENTOS DEL DOM
//======================================================================
const splashScreen = document.getElementById('splash-screen');
const continueButton = document.getElementById('continue-button');
const gameWrapper = document.getElementById('game-wrapper');
const mainHeader = document.getElementById('main-header');
const mainTitle = document.getElementById('main-title');
const gameUiTop = document.getElementById('game-ui-top');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
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

//======================================================================
// 2. CONSTANTES Y CONFIGURACIÓN DEL JUEGO
//======================================================================

// --- Constantes del Canvas y Física ---
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
const GRAVITY = 0.7;

// --- Constantes de Jugador y Combate ---
const BASE_PLAYER_SPEED = 4;
const BASE_JUMP_STRENGTH = 15;
const MAX_HEALTH = 150;
const PUNCH_DAMAGE = 10;
const KICK_DAMAGE = 13;
const SUPER_PUNCH_DAMAGE = 30;
const SUPER_KICK_DAMAGE = 35;
const PUNCH_RANGE = 50;
const KICK_RANGE = 60;
const ATTACK_ANIMATION_DURATION = 150;
const ATTACK_LOGIC_DURATION = 200;
const ATTACK_COOLDOWN = 550;
const BASE_KNOCKBACK_STRENGTH = 12;

// --- Constantes de Poder ---
const MAX_POWER = 150;
const POWER_GAIN_PER_CLICK = 5;
const CLICK_COOLDOWN = 100;
const POWER_GAIN_PER_HIT = 25;

// --- Constantes de la IA ---
const AI_PASSIVE_POWER_GAIN = 0.35;
const AI_ACTION_INTERVAL = 250;
const AI_MOVE_CHANCE = 0.7;
const AI_JUMP_CHANCE = 0.15;
const AI_ATTACK_CHANCE_IN_RANGE = 0.75;
const AI_KICK_CHANCE = 0.4;

// --- Efectos Visuales ---
const HIT_EFFECT_LIFETIME = 30;
const hitWords = ["¡POW!", "¡BAM!", "¡CRASH!", "¡KAPOW!", "¡WHAM!", "¡SLAP!", "¡BOOM!", "¡BANG!", "¡PUFF!", "¡THWACK!"];
const hitWordColors = ["#FFD700", "#FF4500", "#ADFF2F", "#00FFFF", "#FF69B4", "#FFFF00", "#FF1493"];

// --- Constantes de Pose del Personaje ---
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

//======================================================================
// 3. REFACTORIZACIÓN: CONSTANTES DE SUPERPODERES
//======================================================================
const SUPER_STATS = {
    PIRANHA: { SPEED: 5, LIFESPAN: 60, WIDTH: 30, HEIGHT: 20, DAMAGE: 15, COUNT: 3 },
    LA_EX: { COUNT: 5, WAD_WIDTH: 30, WAD_HEIGHT: 20, DAMAGE: 10, INITIAL_Y: -20, COIN_DAMAGE: 5 },
    BURRIC: { LIFESPAN: 120, WIDTH: 40, HEIGHT: 50, DAMAGE: 18, COUNT: 5, INITIAL_Y: -50 },
    MATTHEI_BOLT: { SPEED: 22.5, COUNT: 5, DAMAGE: 8 },
    EL_ZANJAS: { DAMAGE: 40, SWALLOWED_DURATION: 90, WIDTH: 150, MAX_HEIGHT: 80, LIFESPAN: 180 },
    PAPELUCHO: { STUN_DURATION: 180, COUNT: 20, WIDTH: 25, HEIGHT: 35, DAMAGE: 1 },
    ORSINI_LOVE: { SPEED: 7, LIFESPAN: 90, WIDTH: 30, HEIGHT: 25, DAMAGE: 18, COUNT: 2 },
    JACKSON: { INVISIBILITY_DURATION: 120, CONFUSION_DURATION: 120, SMOKE_PARTICLE_COUNT: 30 },
    TIA_COTE: { BEAM_DURATION: 120, BEAM_WIDTH: 90, BEAM_DAMAGE_PER_FRAME: 0.5, HEART_SPEED: 6, HEART_LIFESPAN: 90, HEART_WIDTH: 25, HEART_HEIGHT: 22, HEART_DAMAGE: 2, HEART_COUNT: 25 }
};

//======================================================================
// 4. REFACTORIZACIÓN: PRECARGA DE AUDIO
//======================================================================
const sounds = {
    backgroundMusic: new Audio('audio/playbackbattle.mp3'),
    hit: new Audio('audio/2BH.wav'),
    gameOver: new Audio('audio/9BH.wav'),
    select: new Audio('audio/20H.wav'),
    superGeneric: new Audio('audio/38H.wav'),
    superPiranha: new Audio('audio/hadouken.wav'),
    superJackson: new Audio('audio/smoke-bomb.wav'),
    superCote: new Audio('audio/angelic-choir.wav'),
    jacksonConfused: new Audio('audio/pouf-bomb.wav')
};
sounds.backgroundMusic.loop = true;

//======================================================================
// 5. VARIABLES GLOBALES DEL JUEGO
//======================================================================
let gameActive = false;
let players = [];
let activeHitEffects = [];
let smokeParticles = [];
let screenShakeMagnitude = 0;
let screenShakeTimeLeft = 0;
let playerSelectedCharIndex = -1;
let pcSelectedCharIndex = -1;
let pcSelectionInterval = null;
let animationFrameId;

//======================================================================
// 6. DATOS DE PERSONAJES (ASSETS Y FONDOS)
//======================================================================
const characterBackgrounds = {
    "El Zanjas": ["img/lazanja.png"], "Tía Cote": ["img/glitter.png"], "Escape Room Jackson": ["img/happyhour.png"],
    "Piraña": ["img/lamoneda.png"], "La Ex": ["img/lamoneda.png"], "Matthei Bolt": ["img/pasillomoneda.png"],
    "Burric": ["img/pasillomoneda.png"], "Orsini Love": ["img/pasillomoneda.png"], "Carolina Papelucho": ["img/pasillomoneda.png"]
};

const characterAssets = [
    { name: "Piraña", previewImage: "img/personaje1-cabeza.png", textures: { head: "img/personaje1-cabeza.png", torso: "img/personaje1-torso.png", upperArm: "img/personaje1-brazos.png", foreArm: "img/personaje1-antebrazos.png", thigh: "img/personaje1-muslos.png", lowerLeg: "img/personaje1-piernasbajas.png", glove_r: "img/personaje1-guantes-d.png", glove_l: "img/personaje1-guantes-i.png", shoe: "img/personaje1-zapatos.png", superEffectTexture: "img/personaje1-super-effect.png" }},
    { name: "La Ex", previewImage: "img/personaje2-cabeza.png", textures: { head: "img/personaje2-cabeza.png", torso: "img/personaje2-torso.png", upperArm: "img/personaje2-brazos.png", foreArm: "img/personaje2-antebrazos.png", thigh: "img/personaje2-muslos.png", lowerLeg: "img/personaje2-piernasbajas.png", glove_r: "img/personaje2-guantes-d.png", glove_l: "img/personaje2-guantes-i.png", shoe: "img/personaje2-zapatos.png", superEffectTexture: "img/personaje2-super-effect.png" }},
    { name: "Burric", previewImage: "img/personaje3-cabeza.png", textures: { head: "img/personaje3-cabeza.png", torso: "img/personaje3-torso.png", upperArm: "img/personaje3-brazos.png", foreArm: "img/personaje3-antebrazos.png", thigh: "img/personaje3-muslos.png", lowerLeg: "img/personaje3-piernasbajas.png", glove_r: "img/personaje3-guantes-d.png", glove_l: "img/personaje3-guantes-i.png", shoe: "img/personaje3-zapatos.png", superEffectTexture: "img/personaje3-super-effect.png" }},
    { name: "Matthei Bolt", previewImage: "img/personaje4-cabeza.png", textures: { head: "img/personaje4-cabeza.png", torso: "img/personaje4-torso.png", upperArm: "img/personaje4-brazos.png", foreArm: "img/personaje4-antebrazos.png", thigh: "img/personaje4-muslos.png", lowerLeg: "img/personaje4-piernasbajas.png", glove_r: "img/personaje4-guantes-d.png", glove_l: "img/personaje4-guantes-i.png", shoe: "img/personaje4-zapatos.png", superEffectTexture: "img/personaje4-super-effect.png", yellowVest: "img/matthei-chaleco.png" }},
    { name: "Carolina Papelucho", previewImage: "img/personaje5-cabeza.png", textures: { head: "img/personaje5-cabeza.png", torso: "img/personaje5-torso.png", upperArm: "img/personaje5-brazos.png", foreArm: "img/personaje5-antebrazos.png", thigh: "img/personaje5-muslos.png", lowerLeg: "img/personaje5-piernasbajas.png", glove_r: "img/personaje5-guantes-d.png", glove_l: "img/personaje5-guantes-i.png", shoe: "img/personaje5-zapatos.png", superEffectTexture: "img/personaje5-super-effect.png" }},
    { name: "El Zanjas", previewImage: "img/personaje6-cabeza.png", textures: { head: "img/personaje6-cabeza.png", torso: "img/personaje6-torso.png", upperArm: "img/personaje6-brazos.png", foreArm: "img/personaje6-antebrazos.png", thigh: "img/personaje6-muslos.png", lowerLeg: "img/personaje6-piernasbajas.png", glove_r: "img/personaje6-guantes-d.png", glove_l: "img/personaje6-guantes-i.png", shoe: "img/personaje6-zapatos.png", superEffectTexture: "img/personaje6-super-effect.png" }},
    { name: "Orsini Love", previewImage: "img/personaje7-cabeza.png", textures: { head: "img/personaje7-cabeza.png", torso: "img/personaje7-torso.png", upperArm: "img/personaje7-brazos.png", foreArm: "img/personaje7-antebrazos.png", thigh: "img/personaje7-muslos.png", lowerLeg: "img/personaje7-piernasbajas.png", glove_r: "img/personaje7-guantes-d.png", glove_l: "img/personaje7-guantes-i.png", shoe: "img/personaje7-zapatos.png", superEffectTexture: "img/personaje7-super-effect.png" }},
    { name: "Escape Room Jackson", previewImage: "img/personaje8-cabeza.png", textures: { head: "img/personaje8-cabeza.png", torso: "img/personaje8-torso.png", upperArm: "img/personaje8-brazos.png", foreArm: "img/personaje8-antebrazos.png", thigh: "img/personaje8-muslos.png", lowerLeg: "img/personaje8-piernasbajas.png", glove_r: "img/personaje8-guantes-d.png", glove_l: "img/personaje8-guantes-i.png", shoe: "img/personaje8-zapatos.png", superEffectTexture: "img/personaje8-super-effect.png" }},
    { name: "Tía Cote", previewImage: "img/personaje9-cabeza.png", textures: { head: "img/personaje9-cabeza.png", torso: "img/personaje9-torso.png", upperArm: "img/personaje9-brazos.png", foreArm: "img/personaje9-antebrazos.png", thigh: "img/personaje9-muslos.png", lowerLeg: "img/personaje9-piernasbajas.png", glove_r: "img/personaje9-guantes-d.png", glove_l: "img/personaje9-guantes-i.png", shoe: "img/personaje9-zapatos.png", superEffectTexture: "img/personaje9-super-effect.png" }}
];

//======================================================================
// 7. CLASE PLAYER (LÓGICA DEL LUCHADOR)
//======================================================================
class Player {
    constructor(x, initialY, characterAsset, isPlayer1 = true, facingRight = true) {
        this.name = characterAsset.name;
        this.x = x;
        this.isPlayer1 = isPlayer1;
        this.facingRight = facingRight;

        // Carga de texturas
        this.textures = {};
        for(const key in characterAsset.textures){
            this.textures[key] = this.loadTexture(characterAsset.textures[key]);
        }

        this.setStats();
        this.y = initialY - this.height;
        this.velocityX = 0; this.velocityY = 0; this.isJumping = false;
        this.health = MAX_HEALTH; this.maxHealth = MAX_HEALTH;
        this.power = 0; this.maxPower = MAX_POWER; this.isSuperCharged = false; this.lastPowerClickTime = 0;
        
        // Estados de ataque
        this.isPunching = false; this.isKicking = false; this.attackVisualActive = false; this.lastAttackTime = 0;
        this.attackArm = null; this.nextPunchArm = 'right';
        
        // Estados de la IA
        this.lastAIDecisionTime = 0; this.currentAction = null;

        // Estados de superpoderes y efectos
        this.isPerformingSuperAttackAnimation = false; this.isDashing = false; this.isCastingCrack = false;
        this.isCastingBeam = false; this.isSwallowed = false; this.isStunned = false; this.isInvisible = false;
        this.isConfused = false; this.showBlurred = false;

        // Contadores y temporizadores
        this.dashCount = 0; this.crackTimer = 0; this.beamTimer = 0; this.swallowedTimer = 0;
        this.stunTimer = 0; this.invisibilityTimer = 0; this.confusionTimer = 0; this.confusionBlinkTimer = 0;

        // Arrays de proyectiles y efectos
        this.activeProjectiles = []; this.trail = [];
    }

    loadTexture(src) {
        if (!src) return null;
        const img = new Image();
        img.src = src;
        img.onerror = () => console.warn('Error al cargar textura:', src);
        return img;
    }

    setStats() {
        this.width = 50; this.height = 100; this.speed = BASE_PLAYER_SPEED;
        this.punchDamage = PUNCH_DAMAGE; this.kickDamage = KICK_DAMAGE;
        this.punchRange = PUNCH_RANGE; this.kickRange = KICK_RANGE;
        this.attackCooldown = ATTACK_COOLDOWN; this.jumpStrength = BASE_JUMP_STRENGTH;
        this.knockbackStrength = BASE_KNOCKBACK_STRENGTH;

        this.headSize = this.width * 0.75; this.torsoHeight = this.height * 0.5; this.torsoWidth = this.width * 0.8;
        this.armWidth = this.width * 0.20; this.upperArmLength = this.torsoHeight * 0.425; this.foreArmLength = this.torsoHeight * 0.425;
        this.thighHeight = this.height * 0.13; this.lowerLegHeight = this.height * 0.13; this.legWidth = this.torsoWidth * 0.22;
        this.gloveSize = this.armWidth * 3.0; this.shoeHeight = this.height * 0.22; this.shoeWidth = this.legWidth * 1.6;
    }

    drawPartWithTexture(partName, destX, destY, destWidth, destHeight, shouldFlipHorizontally = false) {
        const currentTexture = this.textures[partName];
        if (currentTexture && currentTexture.complete && currentTexture.width > 0) {
            ctx.save();
            if (shouldFlipHorizontally) {
                ctx.translate(destX + destWidth, destY);
                ctx.scale(-1, 1);
                ctx.drawImage(currentTexture, 0, 0, destWidth, destHeight);
            } else {
                ctx.drawImage(currentTexture, destX, destY, destWidth, destHeight);
            }
            ctx.restore();
        }
    }

    drawArm(isPlayerRightArmActual) {
        ctx.save();
        const totalLegSegmentsHeight = this.thighHeight + this.lowerLegHeight;
        const torsoTopY = this.y + (this.height - this.torsoHeight - totalLegSegmentsHeight - this.shoeHeight);
        const baseShoulderY = torsoTopY + this.torsoHeight * 0.25;
        let shoulderXOffset = this.facingRight ? (isPlayerRightArmActual ? this.torsoWidth * 0.30 : this.torsoWidth * 0.70) : (isPlayerRightArmActual ? this.torsoWidth * 0.70 : this.torsoWidth * 0.30);
        const shoulderX = this.x + (this.width - this.torsoWidth) / 2 + shoulderXOffset;
        ctx.translate(shoulderX, baseShoulderY);

        let finalUpperArmAngle, finalForeArmAngle;
        if (this.isCastingBeam) {
            finalUpperArmAngle = this.facingRight ? -Math.PI / 16 : Math.PI + Math.PI / 16;
            finalForeArmAngle = 0;
        } else {
            const isPunchingThisArm = this.isPunching && this.attackVisualActive && ((isPlayerRightArmActual && this.attackArm === 'right') || (!isPlayerRightArmActual && this.attackArm === 'left'));
            if (isPunchingThisArm) {
                finalUpperArmAngle = this.facingRight ? ARM_PUNCH_UPPER_EXTEND_ANGLE : Math.PI - ARM_PUNCH_UPPER_EXTEND_ANGLE;
                finalForeArmAngle = this.facingRight ? ARM_PUNCH_FOREARM_EXTEND_ANGLE : -ARM_PUNCH_FOREARM_EXTEND_ANGLE;
            } else if (this.isPunching && this.attackVisualActive) {
                finalUpperArmAngle = this.facingRight ? ARM_PUNCH_UPPER_RECOIL_ANGLE : Math.PI - ARM_PUNCH_UPPER_RECOIL_ANGLE;
                finalForeArmAngle = this.facingRight ? ARM_PUNCH_FOREARM_RECOIL_ANGLE : -ARM_PUNCH_FOREARM_RECOIL_ANGLE;
            } else {
                finalUpperArmAngle = this.facingRight ? ARM_GUARD_UPPER_ANGLE : Math.PI - ARM_GUARD_UPPER_ANGLE;
                finalForeArmAngle = this.facingRight ? ARM_GUARD_FOREARM_BEND : -ARM_GUARD_FOREARM_BEND;
            }
        }

        ctx.save();
        ctx.rotate(finalUpperArmAngle);
        this.drawPartWithTexture('upperArm', 0, -this.armWidth / 2, this.upperArmLength, this.armWidth);
        ctx.translate(this.upperArmLength, 0);
        ctx.rotate(finalForeArmAngle);
        this.drawPartWithTexture('foreArm', 0, -this.armWidth / 2, this.foreArmLength, this.armWidth);

        const directionalGloveTextureToUse = this.facingRight ? this.textures.glove_r : this.textures.glove_l;
        if (directionalGloveTextureToUse && directionalGloveTextureToUse.complete) {
            const gloveDrawX = this.foreArmLength - (this.armWidth * 0.8);
            const gloveDrawY = -this.gloveSize / 2;
            ctx.drawImage(directionalGloveTextureToUse, gloveDrawX, gloveDrawY, this.gloveSize, this.gloveSize);
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
            angle = isFrontLeg ? (this.facingRight ? LEG_ANGLE_KICK_STRIKE : Math.PI - LEG_ANGLE_KICK_STRIKE) : (this.facingRight ? LEG_ANGLE_KICK_SUPPORT : Math.PI - LEG_ANGLE_KICK_SUPPORT);
        } else {
            angle = isFrontLeg ? (this.facingRight ? LEG_ANGLE_RESTING_FRONT : Math.PI - LEG_ANGLE_RESTING_FRONT) : (this.facingRight ? LEG_ANGLE_RESTING_BACK : Math.PI - LEG_ANGLE_RESTING_BACK);
        }
        ctx.rotate(angle);
        this.drawPartWithTexture('thigh', 0, -this.legWidth / 2, this.thighHeight, this.legWidth);
        ctx.translate(this.thighHeight, 0);
        this.drawPartWithTexture('lowerLeg', 0, -this.legWidth / 2, this.lowerLegHeight, this.legWidth);
        ctx.translate(this.lowerLegHeight - this.shoeHeight * 0.05, 0);

        if (this.textures.shoe && this.textures.shoe.complete) {
            ctx.drawImage(this.textures.shoe, -this.shoeWidth / 2, -this.shoeHeight / 2, this.shoeWidth, this.shoeHeight);
        }
        ctx.restore();
    }
    
    drawProjectiles() {
        this.activeProjectiles.forEach(p => p.draw(ctx));
    }
    
    drawTiaCoteBeam() {
        if (!this.isCastingBeam) return;
        const beamProgress = 1 - (this.beamTimer / SUPER_STATS.TIA_COTE.BEAM_DURATION);
        const currentAlpha = 0.8 * Math.sin(beamProgress * Math.PI);
        ctx.save();
        const beamY = this.y + this.height * 0.3;
        const beamStartX = this.facingRight ? this.x + this.width / 2 : 0;
        const beamTotalWidth = this.facingRight ? CANVAS_WIDTH - beamStartX : this.x + this.width / 2;
        const gradient = ctx.createLinearGradient(beamStartX, beamY, beamStartX, beamY + SUPER_STATS.TIA_COTE.BEAM_WIDTH);
        gradient.addColorStop(0, `rgba(255, 255, 224, ${currentAlpha * 0.5})`);
        gradient.addColorStop(0.5, `rgba(253, 224, 71, ${currentAlpha})`);
        gradient.addColorStop(1, `rgba(255, 255, 224, ${currentAlpha * 0.5})`);
        ctx.fillStyle = gradient;
        ctx.fillRect(beamStartX, beamY, beamTotalWidth, SUPER_STATS.TIA_COTE.BEAM_WIDTH);
        ctx.restore();
    }

    drawZanjasCrack() {
        if (!this.isCastingCrack) return;
        const groundY = CANVAS_HEIGHT - 10;
        const halfLife = SUPER_STATS.EL_ZANJAS.LIFESPAN / 2;
        let progress = (this.crackTimer > halfLife) ? (SUPER_STATS.EL_ZANJAS.LIFESPAN - this.crackTimer) / halfLife : this.crackTimer / halfLife;
        const currentCrackWidth = SUPER_STATS.EL_ZANJAS.WIDTH * progress;
        const currentCrackDepth = SUPER_STATS.EL_ZANJAS.MAX_HEIGHT * progress;
        if (currentCrackWidth <= 2) return;
        ctx.save();
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(this.crackCenterX - currentCrackWidth / 2, groundY);
        ctx.lineTo(this.crackCenterX + currentCrackWidth / 2, groundY);
        ctx.lineTo(this.crackCenterX, groundY + currentCrackDepth);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    drawPlayerModel(x, y) {
        if (this.isSwallowed) return;
        const originalX = this.x, originalY = this.y;
        this.x = x; this.y = y;

        ctx.save();
        if (this.showBlurred) ctx.filter = 'blur(4px)';
        else if ((this.isPerformingSuperAttackAnimation || this.isCastingBeam) && this.attackVisualActive) ctx.filter = 'brightness(1.75) saturate(2.5)';

        const visuallyBackLegIsFront = !this.facingRight;
        this.drawLeg(visuallyBackLegIsFront);
        this.drawLeg(!visuallyBackLegIsFront);

        const torsoGlobalY = this.y + (this.height - this.torsoHeight - (this.thighHeight + this.lowerLegHeight) - this.shoeHeight);
        const torsoGlobalX = this.x + (this.width - this.torsoWidth) / 2;
        
        if (this.facingRight) {
            this.drawArm(false); // Brazo trasero
            this.drawPartWithTexture('torso', torsoGlobalX, torsoGlobalY, this.torsoWidth, this.torsoHeight, !this.facingRight);
            if (this.name === 'Matthei Bolt' && this.isDashing) this.drawVest(torsoGlobalX, torsoGlobalY);
            this.drawPartWithTexture('head', this.x + (this.width - this.headSize) / 2, torsoGlobalY - this.headSize, this.headSize, this.headSize, !this.facingRight);
            this.drawArm(true); // Brazo delantero
        } else {
            this.drawArm(true); // Brazo trasero
            this.drawPartWithTexture('torso', torsoGlobalX, torsoGlobalY, this.torsoWidth, this.torsoHeight, !this.facingRight);
            if (this.name === 'Matthei Bolt' && this.isDashing) this.drawVest(torsoGlobalX, torsoGlobalY);
            this.drawPartWithTexture('head', this.x + (this.width - this.headSize) / 2, torsoGlobalY - this.headSize, this.headSize, this.headSize, !this.facingRight);
            this.drawArm(false); // Brazo delantero
        }

        ctx.restore();
        this.x = originalX; this.y = originalY;
    }

    drawVest(torsoX, torsoY) {
        ctx.save();
        if (!this.facingRight) {
             ctx.translate(this.x + this.width/2, 0);
             ctx.scale(-1,1);
             ctx.translate(-(this.x + this.width/2), 0);
        }
        if (this.textures.yellowVest && this.textures.yellowVest.complete) {
            ctx.drawImage(this.textures.yellowVest, torsoX, torsoY, this.torsoWidth, this.torsoHeight);
        }
        ctx.restore();
    }
    
    draw() {
        if(this.isInvisible) return;
        ctx.save();

        if (this.isDashing) {
            this.trail.forEach((pos, index) => {
                ctx.globalAlpha = (index / this.trail.length) * 0.5;
                this.drawPlayerModel(pos.x, pos.y);
            });
            ctx.globalAlpha = 1;
        }
        this.drawPlayerModel(this.x, this.y);
        
        this.drawProjectiles();
        this.drawTiaCoteBeam();
        this.drawZanjasCrack();
        
        if (this.isConfused || this.isStunned) {
            ctx.font = `bold 24px 'Comic Sans MS'`;
            ctx.fillStyle = this.isConfused ? 'yellow' : 'white';
            ctx.textAlign = 'center';
            ctx.fillText(this.isConfused ? '???' : '!!!', this.x + this.width / 2, this.y - 20);
        }

        if (this.isPerformingSuperAttackAnimation && this.attackVisualActive && this.textures.superEffectTexture && this.textures.superEffectTexture.complete) {
            const effectWidth = this.width * 1.5;
            const effectHeight = this.height * 1.5;
            ctx.globalAlpha = 0.7;
            ctx.drawImage(this.textures.superEffectTexture, this.x + (this.width - effectWidth) / 2, this.y + (this.height - effectHeight) / 2, effectWidth, effectHeight);
        }
        ctx.restore();
    }
    
    // ... (El resto de la clase Player se omite por brevedad en este ejemplo, pero estaría aquí)
}

//======================================================================
// 8. FUNCIONES PRINCIPALES DEL JUEGO
//======================================================================
function createCharacterSelectionUI() {
    characterGrid.innerHTML = '';
    characterAssets.forEach((charAsset, index) => {
        const portraitWrapper = document.createElement('div');
        portraitWrapper.className = 'character-portrait rounded-lg overflow-hidden p-1';
        portraitWrapper.dataset.charIndex = index;
        portraitWrapper.innerHTML = `
            <img src="${charAsset.previewImage}" alt="${charAsset.name}" onerror="this.src='https://placehold.co/100x100/2d3748/e0e0e0?text=${charAsset.name.substring(0,3)}'">
            <div class="character-name-plate">${charAsset.name}</div>
        `;
        portraitWrapper.addEventListener('click', () => handleCharacterSelect(index));
        characterGrid.appendChild(portraitWrapper);
    });
    startButton.disabled = true;
}

function startPCSelectionRoulette() {
    characterGrid.style.pointerEvents = 'none';
    let availableChars = characterAssets.map((_, i) => i).filter(i => i !== playerSelectedCharIndex);
    let rouletteIndex = 0;
    
    pcSelectionInterval = setInterval(() => {
        document.querySelectorAll('.character-portrait.selected-p2').forEach(el => el.classList.remove('selected-p2'));
        const charToHighlightIndex = availableChars[rouletteIndex];
        const portrait = document.querySelector(`[data-char-index='${charToHighlightIndex}']`);
        if (portrait) portrait.classList.add('selected-p2');
        
        sounds.select.currentTime = 0;
        sounds.select.play().catch(e => console.error("Error al reproducir sonido:", e));

        const currentAsset = characterAssets[charToHighlightIndex];
        p2SelectedCharImg.src = currentAsset.previewImage;
        p2SelectedCharName.textContent = currentAsset.name;

        pcSelectedCharIndex = charToHighlightIndex;
        rouletteIndex = (rouletteIndex + 1) % availableChars.length;
    }, 120);

    setTimeout(() => {
        clearInterval(pcSelectionInterval);
        selectionPrompt.textContent = "¡Listo para luchar!";
        selectionPrompt.classList.replace('text-yellow-200', 'text-green-400');
        startButton.disabled = false;
        characterGrid.style.pointerEvents = 'auto';
    }, 2000 + Math.random() * 1000);
}

function handleCharacterSelect(index) {
    if (playerSelectedCharIndex !== -1) return;
    sounds.select.play().catch(e => console.error("Error al reproducir sonido:", e));
    playerSelectedCharIndex = index;
    const playerAsset = characterAssets[index];
    p1SelectedCharImg.src = playerAsset.previewImage;
    p1SelectedCharName.textContent = playerAsset.name;
    const playerPortrait = document.querySelector(`[data-char-index='${index}']`);
    if (playerPortrait) playerPortrait.classList.add('selected-p1');
    selectionPrompt.textContent = "El PC está eligiendo...";
    startPCSelectionRoulette();
}

function initGame() {
    if (playerSelectedCharIndex === -1 || pcSelectedCharIndex === -1) return;
    const playerAsset = characterAssets[playerSelectedCharIndex];
    const pcAsset = characterAssets[pcSelectedCharIndex];

    activeHitEffects = []; smokeParticles = [];
    players = [
        new Player(100, CANVAS_HEIGHT, playerAsset, true, true),
        new Player(CANVAS_WIDTH - 150, CANVAS_HEIGHT, pcAsset, false, false)
    ];
    
    player1NameDisplay.textContent = players[0].name;
    player2NameDisplay.textContent = players[1].name;
    updateHealthBars(); updatePowerBars();
    gameActive = true;
    
    gameOverModal.style.display = 'none';
    controlsPanel.style.display = 'none';
    mainTitle.style.display = 'none';

    const possibleBgs = [...(characterBackgrounds[playerAsset.name] || []), ...(characterBackgrounds[pcAsset.name] || [])];
    if (possibleBgs.length > 0) {
        canvas.style.backgroundImage = `url('${possibleBgs[Math.floor(Math.random() * possibleBgs.length)]}')`;
        canvas.style.backgroundSize = 'cover'; canvas.style.backgroundPosition = 'center';
    }
    
    const startMessageOverlay = document.getElementById('start-message-overlay');
    startMessageOverlay.children[0].textContent = "¡Haz tus clicks para recargar Superpoder!";
    startMessageOverlay.classList.remove('hidden');
    setTimeout(() => startMessageOverlay.classList.add('hidden'), 3000); 

    sounds.backgroundMusic.currentTime = 0;
    sounds.backgroundMusic.play().catch(error => console.warn("Error al reproducir música:", error));
    
    gameUiTop.style.visibility = 'visible';
}

function resetSelectionScreen() {
    gameActive = false;
    gameOverModal.style.display = 'none';
    controlsPanel.style.display = 'block';
    mainTitle.style.display = 'block';
    gameUiTop.style.visibility = 'visible';
    
    if (pcSelectionInterval) clearInterval(pcSelectionInterval);
    characterGrid.style.pointerEvents = 'auto';

    playerSelectedCharIndex = -1; pcSelectedCharIndex = -1;
    p1SelectedCharImg.src = "https://placehold.co/120x120/455a64/e0e0e0?text=P1";
    p1SelectedCharName.textContent = "- Vacío -"; player1NameDisplay.textContent = "JUGADOR";
    p2SelectedCharImg.src = "https://placehold.co/120x120/455a64/e0e0e0?text=PC";
    p2SelectedCharName.textContent = "- Al Azar -"; player2NameDisplay.textContent = "PC";

    document.querySelectorAll('.character-portrait').forEach(el => el.classList.remove('selected-p1', 'selected-p2'));
    selectionPrompt.textContent = "Elige tu luchador para empezar";
    selectionPrompt.classList.replace('text-green-400', 'text-yellow-200');
    startButton.disabled = true;

    sounds.backgroundMusic.pause();
    
    player1HealthBar.style.width = '100%'; player2HealthBar.style.width = '100%';
    player1PowerBar.style.width = '0%'; player2PowerBar.style.width = '0%';
    player1PowerBar.classList.remove('super-charged'); player2PowerBar.classList.remove('super-charged');

    canvas.style.backgroundImage = 'none';
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = 'rgba(45, 55, 72, 0.5)'; ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = '#4a5568'; ctx.fillRect(0, CANVAS_HEIGHT - 10, CANVAS_WIDTH, 10);
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
    player1PowerBar.classList.toggle('super-charged', players[0].isSuperCharged);
    player2PowerBar.classList.toggle('super-charged', players[1].isSuperCharged);
}

function isAnySuperPowerActive() {
    return players.some(p => p.isDashing || p.isCastingCrack || p.isSwallowed || p.isStunned || p.isCastingBeam || p.activeProjectiles.length > 0);
}

function checkGameOver() {
    if (!gameActive || players.length < 2) return;
    if ((players[0].health <= 0 || players[1].health <= 0) && isAnySuperPowerActive()) return;

    let winner = null, winnerAsset = null;
    if (players[0].health <= 0 && players[1].health <= 0) {
        winnerMessage.innerHTML = `<span class="text-4xl font-bold text-yellow-400">¡EMPATE!</span>`;
    } else if (players[1].health <= 0) {
        winner = players[0]; winnerAsset = characterAssets[playerSelectedCharIndex];
    } else if (players[0].health <= 0) {
        winner = players[1]; winnerAsset = characterAssets[pcSelectedCharIndex];
    }

    if (winner !== null || (players[0].health <= 0 && players[1].health <= 0)) {
        gameActive = false;
        sounds.gameOver.play().catch(e => console.error("Error al reproducir sonido:", e));
        gameOverModal.style.display = 'flex';
        document.getElementById('start-message-overlay').classList.add('hidden');
        gameOverMessage.textContent = "¡Fin del Combate!";
        if (winner && winnerAsset) {
            winnerMessage.innerHTML = `<p class="text-2xl mb-4">El ganador es</p><img src="${winnerAsset.previewImage}" onerror="this.src='https://placehold.co/120x120/455a64/e0e0e0?text=WIN'" class="w-32 h-32 mx-auto rounded-full border-4 border-yellow-400 mb-4 object-contain" style="image-rendering: pixelated;"/><p class="text-4xl font-bold text-yellow-400">${winner.name.toUpperCase()}</p>`;
        }
        sounds.backgroundMusic.pause();
    }
}

function drawHitEffects() {
    for (let i = activeHitEffects.length - 1; i >= 0; i--) {
        const effect = activeHitEffects[i];
        ctx.save();
        ctx.font = `bold ${effect.size}px 'Comic Sans MS', 'Arial', sans-serif`;
        ctx.fillStyle = effect.color; ctx.globalAlpha = effect.alpha; ctx.textAlign = 'center';
        ctx.translate(effect.x, effect.y); ctx.rotate(effect.rotation);
        ctx.fillText(effect.text, 0, 0);
        ctx.restore();
        effect.lifetime--; effect.alpha -= (1.0 / (effect.lifetime + 1));
        effect.y -= 0.5; effect.size *= 0.99;
        if (effect.lifetime <= 0) activeHitEffects.splice(i, 1);
    }
}

function drawSmoke() {
    for (let i = smokeParticles.length - 1; i >= 0; i--) {
        const p = smokeParticles[i];
        ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(108, 117, 125, ${p.alpha})`; ctx.fill();
        p.x += p.velocityX; p.y += p.velocityY; p.alpha -= 0.02; p.radius += 0.5;
        if (p.alpha <= 0) smokeParticles.splice(i, 1);
    }
}

function gameLoop() {
    animationFrameId = requestAnimationFrame(gameLoop);
    if (!gameActive) return;

    ctx.save();
    let offsetX = 0, offsetY = 0;
    if (screenShakeTimeLeft > 0) {
        offsetX = (Math.random() - 0.5) * 2 * screenShakeMagnitude;
        offsetY = (Math.random() - 0.5) * 2 * screenShakeMagnitude;
        ctx.translate(offsetX, offsetY);
        screenShakeTimeLeft--;
        if(screenShakeTimeLeft <= 0) screenShakeMagnitude = 0;
    }

    ctx.clearRect(-CANVAS_WIDTH, -CANVAS_HEIGHT, CANVAS_WIDTH * 2, CANVAS_HEIGHT * 2);
    ctx.fillStyle = '#4a5568';
    ctx.fillRect(0, CANVAS_HEIGHT - 10, CANVAS_WIDTH, 10);
    
    players.forEach(player => { player.update(); player.draw(); });
    drawHitEffects(); drawSmoke();
    checkGameOver();

    ctx.restore();
}

//======================================================================
// 9. PUNTO DE ENTRADA Y CONFIGURACIÓN DE EVENTOS
//======================================================================
function setupEventListeners() {
    continueButton.addEventListener('click', () => {
        splashScreen.style.display = 'none';
        gameWrapper.style.display = 'flex';
        document.body.style.overflow = 'auto';
        createCharacterSelectionUI();
        resetSelectionScreen();
        gameLoop();
    });

    restartButton.addEventListener('click', () => {
        resetSelectionScreen();
        createCharacterSelectionUI();
    });

    startButton.addEventListener('click', initGame);

    canvas.addEventListener('click', () => {
        if (gameActive && players.length > 0) players[0].chargePowerOnClick();
    });

    window.addEventListener('keydown', (event) => {
        if (event.code === 'Space' && gameActive && players.length > 0 && players[0].isSuperCharged) {
            event.preventDefault();
            players[0].punch();
        }
    });
}

document.addEventListener('DOMContentLoaded', setupEventListeners);
