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
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
const GRAVITY = 0.7;
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
const MAX_POWER = 150;
const POWER_GAIN_PER_CLICK = 5;
const CLICK_COOLDOWN = 100;
const POWER_GAIN_PER_HIT = 25;
const AI_PASSIVE_POWER_GAIN = 0.35;
const AI_ACTION_INTERVAL = 250;
const AI_MOVE_CHANCE = 0.7;
const AI_JUMP_CHANCE = 0.15;
const AI_ATTACK_CHANCE_IN_RANGE = 0.75;
const AI_KICK_CHANCE = 0.4;
const HIT_EFFECT_LIFETIME = 30;
const hitWords = ["¡POW!", "¡BAM!", "¡CRASH!", "¡KAPOW!", "¡WHAM!", "¡SLAP!", "¡BOOM!", "¡BANG!", "¡PUFF!", "¡THWACK!"];
const hitWordColors = ["#FFD700", "#FF4500", "#ADFF2F", "#00FFFF", "#FF69B4", "#FFFF00", "#FF1493"];
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
// 3. MEJORA: CONSTANTES DE SUPERPODERES AGRUPADAS
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
// 4. MEJORA: PRECARGA DE AUDIO
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
        this.lastPowerClickTime = 0;
        this.isPerformingSuperAttackAnimation = false;
        this.activePiranhaProjectiles = [];
        this.activeMoneyWads = [];
        this.activeCoins = [];
        this.activeCalculators = [];
        this.activePapers = [];
        this.activeKisses = [];
        this.activeHearts = [];

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

        this.isCastingCrack = false;
        this.crackTimer = 0;
        this.crackOpponentHit = false;
        this.crackCenterX = 0;

        this.isCastingBeam = false;
        this.beamTimer = 0;

        this.isSwallowed = false;
        this.swallowedTimer = 0;
        this.isStunned = false;
        this.stunTimer = 0;

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
        img.onerror = () => {
            console.warn('Error loading texture:', src);
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
        }
    }

    drawArm(isPlayerRightArmActual) {
        ctx.save();
        const totalLegSegmentsHeight = this.thighHeight + this.lowerLegHeight;
        const torsoTopY = this.y + (this.height - this.torsoHeight - totalLegSegmentsHeight - this.shoeHeight);
        const baseShoulderY = torsoTopY + this.torsoHeight * 0.25;
        let shoulderXOffset = this.facingRight ? (isPlayerRightArmActual ? this.torsoWidth * 0.30 : this.torsoWidth * 0.70) : (isPlayerRightArmActual ? this.torsoWidth * 0.70 : this.torsoWidth * 0.30);
        const shoulderX = this.x + (this.width - this.torsoWidth) / 2 + shoulderXOffset;
        const shoulderY = baseShoulderY;
        ctx.translate(shoulderX, shoulderY);
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
        this.drawPartWithTexture('arm_upper', 0, -this.armWidth / 2, this.upperArmLength, this.armWidth, false);
        ctx.translate(this.upperArmLength, 0);
        ctx.rotate(finalForeArmAngle);
        this.drawPartWithTexture('arm_fore', 0, -this.armWidth / 2, this.foreArmLength, this.armWidth, false);
        
        let directionalGloveTextureToUse = this.facingRight ? this.gloveTextureImage_r : this.gloveTextureImage_l;
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
        this.drawPartWithTexture('thigh', 0, -this.legWidth / 2, this.thighHeight, this.legWidth, false);
        ctx.translate(this.thighHeight, 0);
        this.drawPartWithTexture('lower_leg', 0, -this.legWidth / 2, this.lowerLegHeight, this.legWidth, false);
        ctx.translate(this.lowerLegHeight - this.shoeHeight * 0.05, 0);

        if (this.shoeTextureImage && this.shoeTextureImage.complete) {
            ctx.drawImage(this.shoeTextureImage, -this.shoeWidth / 2, -this.shoeHeight / 2, this.shoeWidth, this.shoeHeight);
        }
        ctx.restore();
    }
    
    // ... (El resto de los métodos de la clase Player sin cambios) ...

    update() {
        if (this.isSwallowed) {
            this.swallowedTimer--;
            if (this.swallowedTimer <= 0) {
                this.isSwallowed = false;
                this.x = Math.random() * (CANVAS_WIDTH - this.width);
                this.y = -this.height;
                this.velocityY = 0;
            }
            return;
        }
        
        if (this.isStunned) {
            this.stunTimer--;
            if (this.stunTimer <= 0) this.isStunned = false;
            return;
        }

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
        
        if (this.isConfused) {
            this.confusionTimer--;
            this.confusionBlinkTimer--;
            if(this.confusionTimer <= 0) {
                this.isConfused = false;
                this.showBlurred = false;
            }
            if(this.confusionBlinkTimer <= 0) {
                this.showBlurred = !this.showBlurred;
                this.confusionBlinkTimer = 15;
                sounds.jacksonConfused.play().catch(e => console.error("Error playing sound:", e));
            }
        }
        
        if (this.isDashing) {
            this.updateBoltDash();
            this.trail.push({ x: this.x, y: this.y });
            if (this.trail.length > 5) this.trail.shift();
            return;
        }

        if (!this.isPlayer1) this.updateAI();

        this.x += this.velocityX;
        this.velocityY += GRAVITY;
        this.y += this.velocityY;
        
        const opponent = players.find(p => p !== this);
        if(opponent) {
            this.updatePiranhaProjectiles(opponent);
            this.updateMoneyWads(opponent);
            this.updateCoins(opponent);
            this.updateCalculatorProjectiles(opponent);
            this.updatePapers(opponent);
            this.updateKisses(opponent);
            this.updateHearts(opponent);
        }
        
        if (this.isCastingCrack) this.updateZanjasCrack();
        if (this.isCastingBeam) this.updateTiaCoteBeam(opponent);

        const groundY = CANVAS_HEIGHT - 10;
        if (this.y + this.height > groundY) {
            this.y = groundY - this.height;
            this.velocityY = 0;
            this.isJumping = false;
        }
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > CANVAS_WIDTH) this.x = CANVAS_WIDTH - this.width;

        if (!this.isPlayer1 && !this.isSuperCharged && gameActive) this.gainPower(AI_PASSIVE_POWER_GAIN);
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
                sounds.superPiranha.play().catch(e => console.error("Error al reproducir sonido:", e));
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
                sounds.superGeneric.play().catch(e => console.error("Error playing sound:", e));
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
            if (this.name === "Piraña") { hitEffectText = "¡PIRAÑAS!"; hitEffectColor = "#00ced1"; } 
            else if (this.name === "La Ex") { hitEffectText = "¡Estoy forrada!"; hitEffectColor = "#22c55e"; }
            else if (this.name === "Burric") { hitEffectText = "¡No tengo la cifra exacta!"; hitEffectColor = "#8d99ae"; }
            else if (this.name === "Matthei Bolt") { hitEffectText = "¡A CORRER!"; hitEffectColor = "#f39c12"; }
            else if (this.name === "El Zanjas") { hitEffectText = "¡SuperZanja!"; hitEffectColor = "#8B4513"; }
            else if (this.name === "Carolina Papelucho") { hitEffectText = "Te lo explico en una presentación!"; hitEffectColor = "#ff8c00"; }
            else if (this.name === "Orsini Love") { hitEffectText = "Uno pa' Jackson, uno pa' ti"; hitEffectColor = "#ff69b4"; }
            else if (this.name === "Escape Room Jackson") { hitEffectText = "¡Salida de Emergencia!"; hitEffectColor = "#adb5bd"; }
            else if (this.name === "Tía Cote") { hitEffectText = "¡Bendiciones!"; hitEffectColor = "#e879f9"; }
            activeHitEffects.push({ text: hitEffectText, x: this.x + this.width/2, y: this.y, color: hitEffectColor, size: 30, lifetime: HIT_EFFECT_LIFETIME * 1.5, rotation: (Math.random() - 0.5) * 0.2, alpha: 1});
            screenShakeMagnitude = 10;
            screenShakeTimeLeft = 15;
        }
    }

    punch() { this._performAttack(false); }
    kick() { this._performAttack(true); }

    takeDamage(damage, attackerFacingRight) {
        if(this.isDashing || this.isSwallowed) return;
        this.health -= damage;
        if (this.health < 0) this.health = 0;
        
        sounds.hit.currentTime = 0;
        sounds.hit.play().catch(e => console.error("Error playing sound:", e));

        if (!this.isSwallowed) {
            this.velocityX = 0;
            if(!this.isCastingBeam) {
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
    }
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
    return players.some(p => p.isDashing || p.isCastingCrack || p.isSwallowed || p.isStunned || p.isCastingBeam || p.activePiranhaProjectiles.length > 0 || p.activeMoneyWads.length > 0 || p.activeCalculators.length > 0 || p.activePapers.length > 0 || p.activeKisses.length > 0 || p.activeHearts.length > 0);
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
// 9. MEJORA: PUNTO DE ENTRADA Y CONFIGURACIÓN DE EVENTOS
//======================================================================
function setupEventListeners() {
    continueButton.addEventListener('click', () => {
        splashScreen.style.display = 'none';
        gameWrapper.style.display = 'flex';
        document.body.style.overflow = 'auto';
        createCharacterSelectionUI();
        resetSelectionScreen();
        if (!animationFrameId) { // Evita iniciar múltiples bucles
            gameLoop();
        }
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
