// =================================================================
// 1. OBTENCIÓN DE ELEMENTOS DEL DOM
// =================================================================
const splashScreen = document.getElementById('splash-screen');
const continueButton = document.getElementById('continue-button');
const gameWrapper = document.getElementById('game-wrapper');
const gameHeader = document.getElementById('game-header');

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player1HealthBar = document.getElementById('player1HealthBar');
const player2HealthBar = document.getElementById('player2HealthBar');
const player1PowerBar = document.getElementById('player1PowerBar');
const player2PowerBar = document.getElementById('player2PowerBar');
const player1NameDisplay = document.getElementById('player1NameDisplay');
const player2NameDisplay = document.getElementById('player2NameDisplay');
const player1PowerBarContainer = document.getElementById('player1PowerBarContainer');

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

const startMessageOverlay = document.getElementById('start-message-overlay');
const startMessageText = document.getElementById('start-message-text');

// =================================================================
// 2. CONSTANTES Y VARIABLES GLOBALES DEL JUEGO
// =================================================================
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
const PUNCH_RANGE = 50;
const KICK_RANGE = 60;
const ATTACK_ANIMATION_DURATION = 150;
const ATTACK_LOGIC_DURATION = 200;
const ATTACK_COOLDOWN = 550;
const BASE_KNOCKBACK_STRENGTH = 12;
const HIT_EFFECT_LIFETIME = 30;
const POWER_GAIN_PER_CLICK = 4; // Ajustado para un juego más dinámico

const AI_ACTION_INTERVAL = 250;
const AI_MOVE_CHANCE = 0.7;
const AI_JUMP_CHANCE = 0.15;
const AI_ATTACK_CHANCE_IN_RANGE = 0.75;
const AI_KICK_CHANCE = 0.4;

const MAX_POWER = 150;
const POWER_GAIN_PER_HIT = 25;
const SUPER_PUNCH_DAMAGE = 30;
const SUPER_KICK_DAMAGE = 35;

// Constantes de superpoderes...
const PIRANHA_PROJECTILE_SPEED = 8;
const PIRANHA_PROJECTILE_LIFESPAN = 60;
const PIRANHA_PROJECTILE_WIDTH = 30;
const PIRANHA_PROJECTILE_HEIGHT = 20;
const PIRANHA_PROJECTILE_DAMAGE = 15;
const PIRANHA_PROJECTILE_COUNT = 3;

const MONEY_RAIN_COUNT = 5;
const MONEY_RAIN_WAD_WIDTH = 30;
const MONEY_RAIN_WAD_HEIGHT = 20;
const MONEY_RAIN_DAMAGE = 10;
const MONEY_RAIN_INITIAL_Y = -MONEY_RAIN_WAD_HEIGHT;
const COIN_RAIN_DAMAGE = 5;

const CALCULATOR_PROJECTILE_LIFESPAN = 120;
const CALCULATOR_PROJECTILE_WIDTH = 40;
const CALCULATOR_PROJECTILE_HEIGHT = 50;
const CALCULATOR_PROJECTILE_DAMAGE = 18;
const CALCULATOR_PROJECTILE_COUNT = 5;
const CALCULATOR_INITIAL_Y = -CALCULATOR_PROJECTILE_HEIGHT;

const BOLT_DASH_SPEED = 22.5;
const BOLT_DASH_COUNT = 5;
const BOLT_DASH_DAMAGE = 8;

const ZANJAS_CRACK_DAMAGE = 40;
const ZANJAS_SWALLOWED_DURATION = 90;
const ZANJAS_CRACK_WIDTH = 150;
const ZANJAS_CRACK_MAX_HEIGHT = 80;
const ZANJAS_CRACK_LIFESPAN = 180;

const PAPELUCHO_STUN_DURATION = 180;
const PAPELUCHO_PAPER_COUNT = 20;
const PAPELUCHO_PAPER_WIDTH = 25;
const PAPELUCHO_PAPER_HEIGHT = 35;
const PAPELUCHO_PAPER_DAMAGE = 1;

const ORSINI_KISS_SPEED = 7;
const ORSINI_KISS_LIFESPAN = 90;
const ORSINI_KISS_WIDTH = 30;
const ORSINI_KISS_HEIGHT = 25;
const ORSINI_KISS_DAMAGE = 18;
const ORSINI_KISS_COUNT = 2;

const JACKSON_INVISIBILITY_DURATION = 120;
const JACKSON_CONFUSION_DURATION = 120;
const SMOKE_PARTICLE_COUNT = 30;

const TIA_COTE_TEDDY_COUNT = 1;
const TIA_COTE_TEDDY_WIDTH = 120;
const TIA_COTE_TEDDY_HEIGHT = 150;
const TIA_COTE_TEDDY_DAMAGE = 30;
const TIA_COTE_TEDDY_INITIAL_Y = -TIA_COTE_TEDDY_HEIGHT - 50;

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

// Variables de estado
let screenShakeMagnitude = 0;
let screenShakeTimeLeft = 0;
let gameActive = false;
let players = [];
let activeHitEffects = [];
let smokeParticles = [];
let playerSelectedCharIndex = -1;
let pcSelectedCharIndex = -1;
let backgroundMusic;

const hitWords = ["¡POW!", "¡BAM!", "¡CRASH!", "¡KAPOW!", "¡WHAM!", "¡SLAP!", "¡BOOM!", "¡BANG!", "¡PUFF!", "¡THWACK!"];
const hitWordColors = ["#FFD700", "#FF4500", "#ADFF2F", "#00FFFF", "#FF69B4", "#FFFF00", "#FF1493"];

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

const characterAssets = [
    { name: "Piraña", baseColor: '#e0e0e0', previewImage: "img/personaje1-cabeza.png", textures: { head: "img/personaje1-cabeza.png", torso: "img/personaje1-torso.png", upperArm: "img/personaje1-brazos.png", foreArm: "img/personaje1-antebrazos.png", thigh: "img/personaje1-muslos.png", lowerLeg: "img/personaje1-piernasbajas.png", glove_r: "img/personaje1-guantes-d.png", glove_l: "img/personaje1-guantes-i.png", glove: null, shoe: "img/personaje1-zapatos.png", superEffectTexture: "img/personaje1-super-effect.png" } },
    { name: "La Ex", baseColor: '#c0392b', previewImage: "img/personaje2-cabeza.png", textures: { head: "img/personaje2-cabeza.png", torso: "img/personaje2-torso.png", upperArm: "img/personaje2-brazos.png", foreArm: "img/personaje2-antebrazos.png", thigh: "img/personaje2-muslos.png", lowerLeg: "img/personaje2-piernasbajas.png", glove_r: "img/personaje2-guantes-d.png", glove_l: "img/personaje2-guantes-i.png", glove: null, shoe: "img/personaje2-zapatos.png", superEffectTexture: "img/personaje2-super-effect.png", moneyWadTexture: "img/money-wad.png" } },
    { name: "Burric", baseColor: '#27ae60', previewImage: "img/personaje3-cabeza.png", textures: { head: "img/personaje3-cabeza.png", torso: "img/personaje3-torso.png", upperArm: "img/personaje3-brazos.png", foreArm: "img/personaje3-antebrazos.png", thigh: "img/personaje3-muslos.png", lowerLeg: "img/personaje3-piernasbajas.png", glove_r: "img/personaje3-guantes-d.png", glove_l: "img/personaje3-guantes-i.png", glove: null, shoe: "img/personaje3-zapatos.png", superEffectTexture: "img/personaje3-super-effect.png", calculatorProjectileTexture: "img/calculator.png" } },
    { name: "Matthei Bolt", baseColor: '#f39c12', previewImage: "img/personaje4-cabeza.png", textures: { head: "img/personaje4-cabeza.png", torso: "img/personaje4-torso.png", upperArm: "img/personaje4-brazos.png", foreArm: "img/personaje4-antebrazos.png", thigh: "img/personaje4-muslos.png", lowerLeg: "img/personaje4-piernasbajas.png", glove_r: "img/personaje4-guantes-d.png", glove_l: "img/personaje4-guantes-i.png", glove: null, shoe: "img/personaje4-zapatos.png", superEffectTexture: "img/personaje4-super-effect.png", yellowVest: "img/matthei-chaleco.png" } },
    { name: "Carolina Papelucho", baseColor: '#d35400', previewImage: "img/personaje5-cabeza.png", textures: { head: "img/personaje5-cabeza.png", torso: "img/personaje5-torso.png", upperArm: "img/personaje5-brazos.png", foreArm: "img/personaje5-antebrazos.png", thigh: "img/personaje5-muslos.png", lowerLeg: "img/personaje5-piernasbajas.png", glove_r: "img/personaje5-guantes-d.png", glove_l: "img/personaje5-guantes-i.png", glove: null, shoe: "img/personaje5-zapatos.png", superEffectTexture: "img/personaje5-super-effect.png" } },
    { name: "El Zanjas", baseColor: '#7f8c8d', previewImage: "img/personaje6-cabeza.png", textures: { head: "img/personaje6-cabeza.png", torso: "img/personaje6-torso.png", upperArm: "img/personaje6-brazos.png", foreArm: "img/personaje6-antebrazos.png", thigh: "img/personaje6-muslos.png", lowerLeg: "img/personaje6-piernasbajas.png", glove_r: "img/personaje6-guantes-d.png", glove_l: "img/personaje6-guantes-i.png", glove: null, shoe: "img/personaje6-zapatos.png", superEffectTexture: "img/personaje6-super-effect.png" } },
    { name: "Orsini Love", baseColor: '#ff69b4', previewImage: "img/personaje7-cabeza.png", textures: { head: "img/personaje7-cabeza.png", torso: "img/personaje7-torso.png", upperArm: "img/personaje7-brazos.png", foreArm: "img/personaje7-antebrazos.png", thigh: "img/personaje7-muslos.png", lowerLeg: "img/personaje7-piernasbajas.png", glove_r: "img/personaje7-guantes-d.png", glove_l: "img/personaje7-guantes-i.png", glove: null, shoe: "img/personaje7-zapatos.png", superEffectTexture: "img/personaje7-super-effect.png" } },
    { name: "Escape Room Jackson", baseColor: '#6c757d', previewImage: "img/personaje8-cabeza.png", textures: { head: "img/personaje8-cabeza.png", torso: "img/personaje8-torso.png", upperArm: "img/personaje8-brazos.png", foreArm: "img/personaje8-antebrazos.png", thigh: "img/personaje8-muslos.png", lowerLeg: "img/personaje8-piernasbajas.png", glove_r: "img/personaje8-guantes-d.png", glove_l: "img/personaje8-guantes-i.png", glove: null, shoe: "img/personaje8-zapatos.png", superEffectTexture: "img/personaje8-super-effect.png" } },
    { name: "Tía Cote", baseColor: '#9b59b6', previewImage: "img/personaje9-cabeza.png", textures: { head: "img/personaje9-cabeza.png", torso: "img/personaje9-torso.png", upperArm: "img/personaje9-brazos.png", foreArm: "img/personaje9-antebrazos.png", thigh: "img/personaje9-muslos.png", lowerLeg: "img/personaje9-piernasbajas.png", glove_r: "img/personaje9-guantes-d.png", glove_l: "img/personaje9-guantes-i.png", glove: null, shoe: "img/personaje9-zapatos.png", superEffectTexture: "img/personaje9-super-effect.png" } }
];

const bodyTypeStats = {
    normal: { width: 50, height: 100, speedMod: 1.0, damageMod: 1.0, rangeMod: 1.0, healthMod: 1.0 }
};

// =================================================================
// 3. DEFINICIÓN DE CLASES Y FUNCIONES
// =================================================================

class Player {
    constructor(x, initialY, characterAsset, isPlayer1 = true, facingRight = true) {
        this.name = characterAsset.name;
        this.x = x;
        this.baseColor = characterAsset.baseColor;
        this.isPlayer1 = isPlayer1;
        this.facingRight = facingRight;

        this.headTextureImage = assetCache[characterAsset.textures.head];
        this.bodyTextureImage = assetCache[characterAsset.textures.torso];
        this.upperArmTextureImage = assetCache[characterAsset.textures.upperArm];
        this.foreArmTextureImage = assetCache[characterAsset.textures.foreArm];
        this.thighTextureImage = assetCache[characterAsset.textures.thigh];
        this.lowerLegTextureImage = assetCache[characterAsset.textures.lowerLeg];
        this.gloveTextureImage_r = assetCache[characterAsset.textures.glove_r];
        this.gloveTextureImage_l = assetCache[characterAsset.textures.glove_l];
        this.shoeTextureImage = assetCache[characterAsset.textures.shoe];
        this.superEffectTextureImage = assetCache[characterAsset.textures.superEffectTexture];
        this.yellowVestTextureImage = assetCache[characterAsset.textures.yellowVest];
        this.moneyWadTextureImage = assetCache[characterAsset.textures.moneyWadTexture];
        this.calculatorProjectileTextureImage = assetCache[characterAsset.textures.calculatorProjectileTexture];
        
        this.setStats();
        this.y = initialY - this.height;
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
        this.activeTeddies = [];
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

        if (currentTexture) {
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
        ctx.save();
        ctx.rotate(finalUpperArmAngle);
        this.drawPartWithTexture('arm_upper', 0, -this.armWidth / 2, this.upperArmLength, this.armWidth, false);
        ctx.translate(this.upperArmLength, 0);
        ctx.rotate(finalForeArmAngle);
        this.drawPartWithTexture('arm_fore', 0, -this.armWidth / 2, this.foreArmLength, this.armWidth, false);

        let directionalGloveTextureToUse = this.facingRight ? this.gloveTextureImage_r : this.gloveTextureImage_l;

        if (directionalGloveTextureToUse) {
            const gloveDrawX = this.foreArmLength - (this.armWidth * 0.8);
            const gloveDrawY = -this.gloveSize / 2;
            ctx.drawImage(directionalGloveTextureToUse, gloveDrawX, gloveDrawY, this.gloveSize, this.gloveSize);
        } else {
            ctx.fillStyle = BOXING_GLOVE_COLOR;
            const gloveMainRadiusX = this.gloveSize / 2;
            const gloveMainRadiusY = this.gloveSize / 2.2;
            const mainGloveCenterX = this.foreArmLength - this.armWidth * 0.5 + gloveMainRadiusX * 0.7;
            ctx.beginPath();
            ctx.ellipse(mainGloveCenterX, 0, gloveMainRadiusX, gloveMainRadiusY, 0, 0, Math.PI * 2);
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
            angle = isFrontLeg ? (this.facingRight ? LEG_ANGLE_KICK_STRIKE : Math.PI - LEG_ANGLE_KICK_STRIKE) : (this.facingRight ? LEG_ANGLE_KICK_SUPPORT : Math.PI - LEG_ANGLE_KICK_SUPPORT);
        } else {
            angle = isFrontLeg ? (this.facingRight ? LEG_ANGLE_RESTING_FRONT : Math.PI - LEG_ANGLE_RESTING_FRONT) : (this.facingRight ? LEG_ANGLE_RESTING_BACK : Math.PI - LEG_ANGLE_RESTING_BACK);
        }
        ctx.rotate(angle);
        this.drawPartWithTexture('thigh', 0, -this.legWidth / 2, this.thighHeight, this.legWidth, false);
        ctx.translate(this.thighHeight, 0);
        this.drawPartWithTexture('lower_leg', 0, -this.legWidth / 2, this.lowerLegHeight, this.legWidth, false);
        ctx.translate(this.lowerLegHeight - this.shoeHeight * 0.05, 0);

        if (this.shoeTextureImage) {
            ctx.drawImage(this.shoeTextureImage, -this.shoeWidth / 2, -this.shoeHeight / 2, this.shoeWidth, this.shoeHeight);
        } else {
            ctx.fillStyle = DEFAULT_SHOE_COLOR;
            ctx.fillRect(-this.shoeWidth / 2, -this.shoeHeight / 2, this.shoeWidth, this.shoeHeight);
        }
        ctx.restore();
    }
	
    drawPiranhaProjectiles() {
        this.activePiranhaProjectiles.forEach(p => {
            ctx.save();
            ctx.translate(p.x, p.y);
            if (!p.direction) {
                ctx.translate(p.width, 0);
                ctx.scale(-1, 1);
            }
            ctx.fillStyle = '#95a5a6';
            ctx.beginPath();
            ctx.ellipse(p.width / 2, p.height / 2, p.width / 2, p.height / 2.5, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#7f8c8d';
            ctx.beginPath();
            ctx.moveTo(0, p.height / 2);
            ctx.lineTo(-p.width * 0.2, 0);
            ctx.lineTo(-p.width * 0.2, p.height);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = 'red';
            ctx.beginPath();
            ctx.arc(p.width * 0.75, p.height * 0.4, 2, 0, Math.PI * 2);
            ctx.fill();
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
            if (this.moneyWadTextureImage) {
                ctx.drawImage(this.moneyWadTextureImage, -wad.width / 2, -wad.height / 2, wad.width, wad.height);
            } else {
                ctx.fillStyle = '#22c55e';
                ctx.fillRect(-wad.width / 2, -wad.height / 2, wad.width, wad.height);
            }
            ctx.restore();
        });
    }

    drawCoins() {
        this.activeCoins.forEach(coin => {
            ctx.save();
            ctx.translate(coin.x, coin.y);
            ctx.fillStyle = '#facc15';
            ctx.beginPath();
            ctx.arc(0, 0, coin.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#eab308';
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
            if (this.calculatorProjectileTextureImage) {
                ctx.drawImage(this.calculatorProjectileTextureImage, -calc.width / 2, -calc.height / 2, calc.width, calc.height);
            } else {
                ctx.fillStyle = '#bdc3c7';
                ctx.fillRect(-calc.width / 2, -calc.height / 2, calc.width, calc.height);
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
                ctx.fillStyle = '#D04423';
                ctx.fillRect(-paper.width * 0.75, -paper.height * 0.75, paper.width * 1.5, paper.height * 1.5);
            } else {
                ctx.fillStyle = 'white';
                ctx.fillRect(-paper.width / 2, -paper.height / 2, paper.width, paper.height);
            }
            ctx.restore();
        });
    }

    drawKisses() {
        this.activeKisses.forEach(kiss => {
            ctx.save();
            ctx.translate(kiss.x, kiss.y);
            const pixelSize = kiss.width / 11;
            const lipMap = ["   xxx   ", "  xxxxx  ", " xxxxxxx ", "xxxxxxxxx", "xxxxxxxxx", " xxxxxxx ", "  xxxxx  ", "   xxx   "];
            ctx.fillStyle = '#ef233c';
            lipMap.forEach((row, r) => {
                [...row].forEach((char, c) => {
                    if (char === 'x') {
                        ctx.fillRect(c * pixelSize, r * pixelSize, pixelSize, pixelSize);
                    }
                });
            });
            ctx.fillStyle = '#8d0801';
            ctx.fillRect(0, 4 * pixelSize, kiss.width, pixelSize);
            ctx.restore();
        });
    }

    drawTeddies() {
        this.activeTeddies.forEach(teddy => {
            ctx.save();
            ctx.translate(teddy.x + teddy.width / 2, teddy.y + teddy.height / 2);
            ctx.rotate(teddy.rotation);
            const w = teddy.width;
            const h = teddy.height;
            ctx.fillStyle = '#ffc0cb';
            ctx.strokeStyle = '#e75480';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.ellipse(0, h * 0.1, w * 0.35, h * 0.4, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(0, -h * 0.25, w * 0.25, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            const earWidth = w * 0.12;
            const earHeight = h * 0.35;
            ctx.beginPath();
            ctx.ellipse(-w * 0.2, -h * 0.5, earWidth, earHeight, -0.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(w * 0.2, -h * 0.5, earWidth, earHeight, 0.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        });
    }

    drawZanjasCrack() {
        if (!this.isCastingCrack) return;
        const groundY = CANVAS_HEIGHT - 10;
        const halfLife = ZANJAS_CRACK_LIFESPAN / 2;
        let progress = (this.crackTimer > halfLife) ? (ZANJAS_CRACK_LIFESPAN - this.crackTimer) / halfLife : this.crackTimer / halfLife;
        const currentCrackWidth = ZANJAS_CRACK_WIDTH * progress;
        const currentCrackDepth = ZANJAS_CRACK_MAX_HEIGHT * progress;
        if (currentCrackWidth <= 2) return;
        ctx.save();
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(this.crackCenterX - currentCrackWidth / 2, groundY);
        ctx.lineTo(this.crackCenterX + currentCrackWidth / 2, groundY);
        ctx.lineTo(this.crackCenterX, groundY + currentCrackDepth);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#4a2a0a';
        ctx.lineWidth = 3;
        [-1, 1].forEach(s => {
            ctx.beginPath();
            ctx.moveTo(this.crackCenterX + (s * currentCrackWidth / 2), groundY);
            for (let i = 0; i <= 10; i++) {
                ctx.lineTo(this.crackCenterX + (s * (currentCrackWidth / 2) * (1 - i / 10)), groundY + (Math.random() - 0.5) * 8 * progress);
            }
            ctx.stroke();
        });
        ctx.restore();
    }

    draw() {
        if (this.isInvisible) return;
        ctx.save();
        if (this.isDashing) {
            this.trail.forEach((pos, index) => {
                ctx.globalAlpha = (index / this.trail.length) * 0.5;
                this.drawPlayerModel(pos.x, pos.y);
            });
            ctx.globalAlpha = 1;
        }

        this.drawPlayerModel(this.x, this.y);

        // AÑADIDO: Llamadas para dibujar todos los superpoderes
        this.drawPiranhaProjectiles();
        this.drawMoneyWads();
        this.drawCoins();
        this.drawCalculatorProjectiles();
        this.drawPapers();
        this.drawKisses();
        this.drawTeddies();
        if (this.isCastingCrack) {
            this.drawZanjasCrack();
        }
        
        if (this.isConfused || this.isStunned) {
            ctx.font = `bold 24px 'Comic Sans MS'`;
            ctx.fillStyle = this.isConfused ? 'yellow' : 'white';
            ctx.textAlign = 'center';
            ctx.fillText(this.isConfused ? '???' : '!!!', this.x + this.width / 2, this.y - 20);
        }
        ctx.restore();
    }

    drawPlayerModel(x, y) {
        if (this.isSwallowed) return;
        const originalX = this.x, originalY = this.y;
        this.x = x; this.y = y;
        ctx.filter = this.showBlurred ? 'blur(4px)' : (this.isPerformingSuperAttackAnimation && this.attackVisualActive ? 'brightness(1.75) saturate(2.5)' : 'none');
        const totalLegSegmentsHeight = this.thighHeight + this.lowerLegHeight;
        const torsoGlobalY = this.y + (this.height - this.torsoHeight - totalLegSegmentsHeight - this.shoeHeight);
        const torsoGlobalX = this.x + (this.width - this.torsoWidth) / 2;
        const headGlobalX = this.x + (this.width - this.headSize) / 2;
        const headGlobalY = torsoGlobalY - this.headSize;
        this.drawLeg(!this.facingRight);
        this.drawLeg(this.facingRight);
        if (this.facingRight) {
            this.drawArm(false);
            this.drawPartWithTexture('torso', torsoGlobalX, torsoGlobalY, this.torsoWidth, this.torsoHeight, !this.facingRight);
            if (this.name === 'Matthei Bolt' && this.isDashing) this.drawVest(torsoGlobalX, torsoGlobalY);
            this.drawPartWithTexture('head', headGlobalX, headGlobalY, this.headSize, this.headSize, !this.facingRight);
            this.drawArm(true);
        } else {
            this.drawArm(true);
            this.drawPartWithTexture('torso', torsoGlobalX, torsoGlobalY, this.torsoWidth, this.torsoHeight, !this.facingRight);
            if (this.name === 'Matthei Bolt' && this.isDashing) this.drawVest(torsoGlobalX, torsoGlobalY);
            this.drawPartWithTexture('head', headGlobalX, headGlobalY, this.headSize, this.headSize, !this.facingRight);
            this.drawArm(false);
        }
        ctx.filter = 'none';
        this.x = originalX; this.y = originalY;
    }

    drawVest(torsoX, torsoY) {
        ctx.save();
        if (!this.facingRight) {
            ctx.translate(this.x + this.width / 2, 0);
            ctx.scale(-1, 1);
            ctx.translate(-(this.x + this.width / 2), 0);
        }
        if (this.yellowVestTextureImage) {
            ctx.drawImage(this.yellowVestTextureImage, torsoX, torsoY, this.torsoWidth, this.torsoHeight);
        } else {
            ctx.fillStyle = '#eab308';
            ctx.fillRect(torsoX, torsoY, this.torsoWidth, this.torsoHeight);
        }
        ctx.restore();
    }
	
    updateAI() {
        if (this.isConfused) {
            this.confusionTimer--;
            if (this.confusionTimer <= 0) this.isConfused = this.showBlurred = false;
            this.confusionBlinkTimer--;
            if (this.confusionBlinkTimer <= 0) {
                this.showBlurred = !this.showBlurred;
                this.confusionBlinkTimer = 15;
            }
            return;
        }
        if (this.isDashing || this.isSwallowed || this.isCastingCrack || this.isStunned) return;

        if (Date.now() - this.lastAIDecisionTime > AI_ACTION_INTERVAL) {
            this.lastAIDecisionTime = Date.now();
            const opponent = players.find(p => p !== this);
            if (!opponent || opponent.isInvisible) {
                this.currentAction = 'stand';
                return;
            }
            const distanceToOpponent = Math.abs((this.x + this.width / 2) - (opponent.x + opponent.width / 2)) - (this.width / 2 + opponent.width / 2);
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
                    attackType = (Math.random() < AI_KICK_CHANCE || distanceToOpponent >= this.punchRange) ? 'kick' : 'punch';
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
                this.currentAction = (Math.random() < AI_MOVE_CHANCE) ? (distanceToOpponent > this.punchRange * 0.5 ? (opponentIsToTheRight ? 'moveRight' : 'moveLeft') : (Math.random() < 0.3 ? (opponentIsToTheRight ? 'moveLeft' : 'moveRight') : 'stand')) : 'stand';
                if (this.currentAction.startsWith('move')) this.facingRight = opponentIsToTheRight;
                if (Math.random() < AI_JUMP_CHANCE && !this.isJumping) this.jump();
            }
        }
        this.velocityX = 0;
        if (this.currentAction === 'moveLeft') this.velocityX = -this.speed;
        else if (this.currentAction === 'moveRight') this.velocityX = this.speed;
    }
	
    updateProjectiles(opponent, projectiles, effect) {
        for (let i = projectiles.length - 1; i >= 0; i--) {
            const p = projectiles[i];
            p.x += (p.velocityX || 0) * (p.direction ? 1 : -1);
            p.y += p.velocityY || 0;
            if (p.hasOwnProperty('lifespan')) p.lifespan--;
            if (p.hasOwnProperty('velocityY')) p.velocityY += GRAVITY * (p.gravityFactor || 0.5);
            if (p.hasOwnProperty('rotation')) p.rotation += p.rotationSpeed || 0;

            if (p.lifespan <= 0 || p.x > CANVAS_WIDTH || p.x + p.width < 0 || p.y > CANVAS_HEIGHT) {
                projectiles.splice(i, 1);
                continue;
            }

            if (!opponent.isSwallowed && !opponent.isStunned &&
                p.x < opponent.x + opponent.width && p.x + p.width > opponent.x &&
                p.y < opponent.y + opponent.height && p.y + p.height > opponent.y
            ) {
                opponent.takeDamage(p.damage, p.direction);
                if (effect) activeHitEffects.push({ ...effect, x: p.x, y: p.y });
                projectiles.splice(i, 1);
            }
        }
    }

    updateBoltDash(opponent) {
        if (!this.isDashing) return;
        const moveDirection = Math.sign(this.dashTargetX - this.x);
        this.x += moveDirection * BOLT_DASH_SPEED;
        this.facingRight = moveDirection > 0;

        if (!this.dashDamageApplied && !opponent.isSwallowed && !opponent.isStunned &&
            this.x < opponent.x + opponent.width && this.x + this.width > opponent.x &&
            this.y < opponent.y + opponent.height && this.y + this.height > opponent.y
        ) {
            opponent.takeDamage(BOLT_DASH_DAMAGE, moveDirection > 0);
            this.dashDamageApplied = true;
            screenShakeMagnitude = 5;
            screenShakeTimeLeft = 5;
            activeHitEffects.push({ text: "¡ZAS!", x: opponent.x + opponent.width / 2, y: opponent.y + opponent.height / 2, color: "#f39c12", alpha: 1.0, size: 25, rotation: 0, lifetime: HIT_EFFECT_LIFETIME });
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
        if (!opponent || this.crackOpponentHit || opponent.isSwallowed) return;

        if (this.crackTimer < ZANJAS_CRACK_LIFESPAN * 0.7 && this.crackTimer > ZANJAS_CRACK_LIFESPAN * 0.2) {
            if (Math.abs(opponent.x + opponent.width / 2 - this.crackCenterX) < ZANJAS_CRACK_WIDTH / 2 && (opponent.y + opponent.height) >= (CANVAS_HEIGHT - 10)) {
                opponent.takeDamage(ZANJAS_CRACK_DAMAGE, this.facingRight);
                opponent.isSwallowed = true;
                opponent.swallowedTimer = ZANJAS_SWALLOWED_DURATION;
                this.crackOpponentHit = true;
                activeHitEffects.push({ text: "¡TRAGADO!", x: opponent.x + opponent.width / 2, y: opponent.y + opponent.height / 2, color: "#8B4513", alpha: 1.0, size: 40, rotation: (Math.random() - 0.5) * 0.3, lifetime: HIT_EFFECT_LIFETIME * 2 });
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

        if(!this.isPlayer1) this.updateAI();

        if (this.isInvisible) {
            this.invisibilityTimer--;
            if (this.invisibilityTimer <= 0) {
                this.isInvisible = false;
                const opponent = players.find(p => p !== this);
                if (opponent) {
                    this.x = opponent.x + (opponent.facingRight ? opponent.width + 20 : -this.width - 20);
                    this.y = opponent.y;
                }
            }
            return;
        }

        if (this.isDashing) {
            this.updateBoltDash(players.find(p => p !== this));
            this.trail.push({ x: this.x, y: this.y });
            if (this.trail.length > 5) this.trail.shift();
            return;
        }

        this.x += this.velocityX;
        this.velocityY += GRAVITY;
        this.y += this.velocityY;

        // AÑADIDO: Llamadas para actualizar todos los superpoderes
        const opponent = players.find(p => p !== this);
        if (opponent) {
            this.updateProjectiles(opponent, this.activePiranhaProjectiles, { text: "¡ÑAM!", color: "#ff6347", alpha: 1.0, size: 20, rotation: 0, lifetime: HIT_EFFECT_LIFETIME / 2 });
            this.updateProjectiles(opponent, this.activeMoneyWads, { text: "$$$", color: "#22c55e", alpha: 1.0, size: 30, rotation: 0, lifetime: HIT_EFFECT_LIFETIME });
            this.updateProjectiles(opponent, this.activeCoins, { text: "$", color: "#facc15", alpha: 1.0, size: 20, rotation: 0, lifetime: HIT_EFFECT_LIFETIME });
            this.updateProjectiles(opponent, this.activeCalculators, { text: "ERROR", color: "#e53e3e", alpha: 1.0, size: 25, rotation: 0, lifetime: HIT_EFFECT_LIFETIME });
            this.updateProjectiles(opponent, this.activeKisses, { text: "♥", color: "#ff69b4", alpha: 1.0, size: 30, rotation: 0, lifetime: HIT_EFFECT_LIFETIME });
            this.updateProjectiles(opponent, this.activeTeddies, { text: "¡AWW!", color: "#9b59b6", alpha: 1.0, size: 40, rotation: 0, lifetime: HIT_EFFECT_LIFETIME });
            this.activePapers.forEach((paper, i) => {
                 paper.y += paper.velocityY; paper.velocityY += GRAVITY * 0.3; paper.rotation += paper.rotationSpeed;
                 if (paper.y > CANVAS_HEIGHT) this.activePapers.splice(i, 1);
                 else if (!opponent.isSwallowed && !opponent.isStunned && paper.x < opponent.x + opponent.width && paper.x + paper.width > opponent.x && paper.y < opponent.y + opponent.height && paper.y + paper.height > opponent.y) {
                    opponent.takeDamage(PAPELUCHO_PAPER_DAMAGE, this.facingRight);
                    opponent.isStunned = true;
                    opponent.stunTimer = PAPELUCHO_STUN_DURATION;
                    this.activePapers.splice(i, 1);
                 }
            });
        }

        if (this.isCastingCrack) this.updateZanjasCrack();

        const groundY = CANVAS_HEIGHT - 10;
        if (this.y + this.height > groundY) {
            this.y = groundY - this.height;
            this.velocityY = 0;
            this.isJumping = false;
        }
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > CANVAS_WIDTH) this.x = CANVAS_WIDTH - this.width;
    }

    chargePowerOnClick() {
        if (this.isSuperCharged || !gameActive) return;
        if (navigator.vibrate) navigator.vibrate(15);
        player1PowerBarContainer.classList.add('power-bar-container-flash');
        setTimeout(() => player1PowerBarContainer.classList.remove('power-bar-container-flash'), 150);
        this.power = Math.min(this.maxPower, this.power + POWER_GAIN_PER_CLICK);
        if (this.power >= this.maxPower) this.isSuperCharged = true;
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
        this.power = Math.min(this.maxPower, this.power + amount);
        if (this.power >= this.maxPower) this.isSuperCharged = true;
        updatePowerBars();
    }
	
    _launchSuperAttack() {
        // AÑADIDO: Lógica completa para lanzar cada superpoder
        const superAttackMap = {
            "Piraña": () => this.launchPiranhaProjectiles(),
            "La Ex": () => this.launchMoneyWadAttack(),
            "Burric": () => this.launchCalculatorAttack(),
            "Matthei Bolt": () => this.launchBoltDashAttack(),
            "El Zanjas": () => this.launchZanjasAttack(),
            "Carolina Papelucho": () => this.launchPapeluchoAttack(),
            "Orsini Love": () => this.launchOrsiniLoveAttack(),
            "Escape Room Jackson": () => this.launchEscapeRoomJacksonAttack(),
            "Tía Cote": () => this.launchTiaCoteAttack(),
        };
        const attackFn = superAttackMap[this.name];
        if (attackFn) {
            attackFn();
            return true;
        }
        return false;
    }
    
    _performAttack(isKick) {
        if ((this.isPunching || this.isKicking) || (Date.now() - this.lastAttackTime < this.attackCooldown)) return;

        let damage = isKick ? this.kickDamage : this.punchDamage;
        const range = isKick ? this.kickRange : this.punchRange;
        const isSuperMove = this.isSuperCharged;
        let isSpecialSuper = false;

        if (isSuperMove) {
            isSpecialSuper = this._launchSuperAttack();
            if (isSpecialSuper) {
                damage = 0;
            } else {
                damage = isKick ? SUPER_KICK_DAMAGE : SUPER_PUNCH_DAMAGE;
            }
        }

        this.isKicking = isKick;
        this.isPunching = !isKick;
        this.isPerformingSuperAttackAnimation = isSuperMove;
        if (!isKick) this.attackArm = this.nextPunchArm = (this.nextPunchArm === 'right' ? 'left' : 'right');
        
        this.attackVisualActive = true;
        this.lastAttackTime = Date.now();
        setTimeout(() => { this.isKicking = this.isPunching = this.attackArm = null; if (isSuperMove) this.isPerformingSuperAttackAnimation = false; }, ATTACK_LOGIC_DURATION);
        setTimeout(() => { this.attackVisualActive = false; }, ATTACK_ANIMATION_DURATION);

        if (isSuperMove) {
            this.power = 0;
            this.isSuperCharged = false;
            updatePowerBars();
        }
        
        if (isSpecialSuper) {
            return;
        }

        const opponent = players.find(p => p !== this);
        if (!opponent || opponent.isSwallowed) return;

        const attackHitbox = { x: this.x + (this.facingRight ? this.width : -range), y: this.y, width: range, height: this.height };

        if (attackHitbox.x < opponent.x + opponent.width && attackHitbox.x + attackHitbox.width > opponent.x &&
            attackHitbox.y < opponent.y + opponent.height && attackHitbox.y + attackHitbox.height > opponent.y) {
            opponent.takeDamage(damage, this.facingRight);
            if (!isSuperMove) this.gainPower(POWER_GAIN_PER_HIT);
        }
    }

    punch() { this._performAttack(false); }
    kick() { this._performAttack(true); }
	
    takeDamage(damage, attackerFacingRight) {
        if (this.isDashing || this.isSwallowed) return;
        this.health -= damage;
        if (this.health < 0) this.health = 0;
        new Audio('audio/2BH.wav').play().catch(e => {});
        if (!this.isSwallowed) {
            this.x += attackerFacingRight ? this.knockbackStrength : -this.knockbackStrength;
            this.velocityY = -this.knockbackStrength / 2;
        }
        activeHitEffects.push({ text: hitWords[Math.floor(Math.random() * hitWords.length)], x: this.x + this.width / 2, y: this.y + this.height / 3, color: hitWordColors[Math.floor(Math.random() * hitWordColors.length)], alpha: 1.0, size: 24 + Math.random() * 16, rotation: (Math.random() - 0.5) * 0.5, lifetime: HIT_EFFECT_LIFETIME });
        updateHealthBars();
        checkGameOver();
    }

    // AÑADIDO: Implementación de las funciones de lanzamiento que faltaban
    launchPiranhaProjectiles() {
        for (let i = 0; i < PIRANHA_PROJECTILE_COUNT; i++) {
            this.activePiranhaProjectiles.push({
                x: this.x + (this.facingRight ? this.width : -PIRANHA_PROJECTILE_WIDTH),
                y: this.y + this.height / 2 - (i * 10),
                width: PIRANHA_PROJECTILE_WIDTH, height: PIRANHA_PROJECTILE_HEIGHT,
                velocityX: PIRANHA_PROJECTILE_SPEED, direction: this.facingRight,
                lifespan: PIRANHA_PROJECTILE_LIFESPAN, damage: PIRANHA_PROJECTILE_DAMAGE
            });
        }
    }
    launchMoneyWadAttack() {
        const opponent = players.find(p => p !== this);
        if (!opponent) return;
        for (let i = 0; i < MONEY_RAIN_COUNT; i++) {
            const clusterCenterX = opponent.x + opponent.width / 2 + (Math.random() - 0.5) * opponent.width;
            this.activeMoneyWads.push({
                x: clusterCenterX, y: MONEY_RAIN_INITIAL_Y - (Math.random() * 50),
                width: MONEY_RAIN_WAD_WIDTH, height: MONEY_RAIN_WAD_HEIGHT,
                velocityX: (Math.random() - 0.5) * 2, velocityY: Math.random() * 4 + 3,
                rotation: (Math.random() - 0.5) * Math.PI, rotationSpeed: (Math.random() - 0.5) * 0.1,
                damage: MONEY_RAIN_DAMAGE
            });
            for (let k = 0; k < 5; k++) {
                this.activeCoins.push({
                    x: clusterCenterX + (Math.random() - 0.5) * 60, y: MONEY_RAIN_INITIAL_Y - (Math.random() * 50),
                    radius: Math.random() * 5 + 5, velocityY: Math.random() * 5 + 4,
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
                x: opponent.x + (Math.random() - 0.5) * opponent.width,
                y: CALCULATOR_INITIAL_Y - (Math.random() * 100),
                width: CALCULATOR_PROJECTILE_WIDTH, height: CALCULATOR_PROJECTILE_HEIGHT,
                velocityX: (Math.random() - 0.5) * 2, velocityY: (Math.random() * 2) + 2,
                rotation: (Math.random() - 0.5) * 2, rotationSpeed: (Math.random() - 0.5) * 0.2,
                lifespan: CALCULATOR_PROJECTILE_LIFESPAN, damage: CALCULATOR_PROJECTILE_DAMAGE
            });
        }
    }
    launchBoltDashAttack() {
        this.isDashing = true;
        this.dashCount = BOLT_DASH_COUNT;
        this.dashTargetX = this.x > CANVAS_WIDTH / 2 ? 0 : CANVAS_WIDTH - this.width;
        this.dashDamageApplied = false;
        this.velocityY = 0;
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
    launchPapeluchoAttack() {
        const opponent = players.find(p => p !== this);
        if (!opponent) return;
        for (let i = 0; i < PAPELUCHO_PAPER_COUNT; i++) {
            this.activePapers.push({
                x: opponent.x + (opponent.width / 2) + (Math.random() - 0.5) * (opponent.width * 2.5),
                y: -PAPELUCHO_PAPER_HEIGHT - Math.random() * 300,
                width: PAPELUCHO_PAPER_WIDTH, height: PAPELUCHO_PAPER_HEIGHT,
                velocityX: (Math.random() - 0.5) * 4, velocityY: (Math.random() * 2) + 2,
                rotation: (Math.random() - 0.5) * 2, rotationSpeed: (Math.random() - 0.5) * 0.2,
                isPowerPoint: i === 0
            });
        }
    }
    launchOrsiniLoveAttack() {
        for (let i = 0; i < ORSINI_KISS_COUNT; i++) {
            this.activeKisses.push({
                x: this.x + (this.facingRight ? this.width : -ORSINI_KISS_WIDTH),
                y: this.y + this.height / 3,
                width: ORSINI_KISS_WIDTH, height: ORSINI_KISS_HEIGHT,
                velocityX: ORSINI_KISS_SPEED + (i * 2), direction: this.facingRight,
                lifespan: ORSINI_KISS_LIFESPAN, damage: ORSINI_KISS_DAMAGE
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
        for (let i = 0; i < SMOKE_PARTICLE_COUNT; i++) {
            smokeParticles.push({
                x: this.x + this.width / 2, y: this.y + this.height / 2,
                radius: Math.random() * 20 + 10, alpha: 1,
                velocityX: (Math.random() - 0.5) * 4, velocityY: (Math.random() - 0.5) * 4
            });
        }
        this.x = -1000;
    }
    launchTiaCoteAttack() {
        const opponent = players.find(p => p !== this);
        if (!opponent) return;
        this.activeTeddies.push({
            x: opponent.x + (opponent.width / 2) - (TIA_COTE_TEDDY_WIDTH / 2),
            y: TIA_COTE_TEDDY_INITIAL_Y,
            width: TIA_COTE_TEDDY_WIDTH, height: TIA_COTE_TEDDY_HEIGHT,
            velocityY: 1.5, rotation: (Math.random() - 0.5) * 0.1,
            rotationSpeed: (Math.random() - 0.5) * 0.02, damage: TIA_COTE_TEDDY_DAMAGE
        });
    }
}


// =================================================================
// 4. PRE-CARGADOR, LÓGICA DEL JUEGO Y EVENTOS
// =================================================================

let assetCache = {};

function preloadAssets(callback) {
    const assetUrls = new Set();
    characterAssets.forEach(char => {
        Object.values(char.textures).forEach(url => {
            if (url) assetUrls.add(url);
        });
    });
    Object.values(characterBackgrounds).flat().forEach(url => {
        if(url) assetUrls.add(url);
    });

    const totalAssets = assetUrls.size;
    let loadedAssets = 0;

    if (totalAssets === 0) {
        callback();
        return;
    }
    
    selectionPrompt.textContent = `Cargando recursos... 0 / ${totalAssets}`;

    assetUrls.forEach(url => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
            loadedAssets++;
            assetCache[url] = img;
            selectionPrompt.textContent = `Cargando recursos... ${loadedAssets} / ${totalAssets}`;
            if (loadedAssets === totalAssets) {
                selectionPrompt.textContent = "Elige tu luchador para empezar";
                callback();
            }
        };
        img.onerror = () => {
            console.error(`Error al cargar el asset: ${url}`);
            loadedAssets++;
             if (loadedAssets === totalAssets) {
                selectionPrompt.textContent = "Elige tu luchador para empezar";
                callback();
            }
        };
    });
}

function createCharacterSelectionUI() {
    characterGrid.innerHTML = '';
    characterAssets.forEach((charAsset, index) => {
        const portraitWrapper = document.createElement('div');
        portraitWrapper.className = 'character-portrait rounded-lg overflow-hidden p-1';
        portraitWrapper.dataset.charIndex = index;
        const imgEl = document.createElement('img');
        imgEl.src = charAsset.previewImage;
        imgEl.alt = charAsset.name;
        portraitWrapper.appendChild(imgEl);
        const namePlate = document.createElement('div');
        namePlate.className = 'character-name-plate';
        namePlate.textContent = charAsset.name;
        portraitWrapper.appendChild(namePlate);
        portraitWrapper.addEventListener('click', () => handleCharacterSelect(index));
        characterGrid.appendChild(portraitWrapper);
    });
    startButton.disabled = true;
}

function handleCharacterSelect(index) {
    if (playerSelectedCharIndex !== -1) return;
    new Audio('audio/20H.wav').play().catch(e => {});

    playerSelectedCharIndex = index;
    const playerAsset = characterAssets[index];
    p1SelectedCharImg.src = playerAsset.previewImage;
    p1SelectedCharName.textContent = playerAsset.name;
    document.querySelector(`[data-char-index='${index}']`).classList.add('selected-p1');
    selectionPrompt.textContent = "El PC está eligiendo...";

    setTimeout(() => {
        let randomPcIndex;
        do { randomPcIndex = Math.floor(Math.random() * characterAssets.length); } while (randomPcIndex === index);
        pcSelectedCharIndex = randomPcIndex;
        const pcAsset = characterAssets[pcSelectedCharIndex];
        p2SelectedCharImg.src = pcAsset.previewImage;
        p2SelectedCharName.textContent = pcAsset.name;
        document.querySelector(`[data-char-index='${pcSelectedCharIndex}']`).classList.add('selected-p2');
        selectionPrompt.textContent = "¡Listo para luchar!";
        selectionPrompt.classList.remove('text-yellow-200');
        selectionPrompt.classList.add('text-green-400');
        startButton.disabled = false;
    }, 1000);
}

function initGame() {
    if (playerSelectedCharIndex === -1 || pcSelectedCharIndex === -1) return;

    activeHitEffects = [];
    players = [
        new Player(100, CANVAS_HEIGHT, characterAssets[playerSelectedCharIndex], true, true),
        new Player(CANVAS_WIDTH - 150, CANVAS_HEIGHT, characterAssets[pcSelectedCharIndex], false, false)
    ];

    players.forEach(p => { p.health = p.maxHealth; p.power = 0; });
    player1NameDisplay.textContent = players[0].name;
    player2NameDisplay.textContent = players[1].name;
    updateHealthBars();
    updatePowerBars();

    gameActive = true;
    gameOverModal.classList.add('hidden');
    controlsPanel.style.display = 'none';

    const possibleBgs = [...(characterBackgrounds[players[0].name] || []), ...(characterBackgrounds[players[1].name] || [])];
    if (possibleBgs.length > 0) {
        const bgUrl = possibleBgs[Math.floor(Math.random() * possibleBgs.length)];
        canvas.style.backgroundImage = `url('${bgUrl}')`;
        canvas.style.backgroundSize = 'cover';
        canvas.style.backgroundPosition = 'center';
    }

    startMessageText.textContent = "¡Haz tus clicks para recargar Superpoder!";
    startMessageOverlay.classList.remove('hidden');
    setTimeout(() => startMessageOverlay.classList.add('hidden'), 3000);

    if (backgroundMusic) {
        backgroundMusic.currentTime = 0;
        backgroundMusic.play().catch(e => {});
    }
    gameHeader.style.display = 'none';
    gameLoop();
}

function resetSelectionScreen() {
    gameOverModal.classList.add('hidden');
    controlsPanel.style.display = 'block';
    playerSelectedCharIndex = -1;
    pcSelectedCharIndex = -1;

    p1SelectedCharImg.src = "https://placehold.co/120x120/455a64/e0e0e0?text=P1";
    p1SelectedCharName.textContent = "- Vacío -";
    player1NameDisplay.textContent = "JUGADOR";

    p2SelectedCharImg.src = "https://placehold.co/120x120/455a64/e0e0e0?text=PC";
    p2SelectedCharName.textContent = "- Al Azar -";
    player2NameDisplay.textContent = "PC";

    document.querySelectorAll('.character-portrait').forEach(el => el.classList.remove('selected-p1', 'selected-p2'));
    if (!assetCache || Object.keys(assetCache).length === 0) {
        selectionPrompt.textContent = "Cargando...";
    } else {
        selectionPrompt.textContent = "Elige tu luchador para empezar";
    }
    selectionPrompt.className = 'text-center text-xl text-yellow-200 mb-4';
    startButton.disabled = true;

    if (backgroundMusic) backgroundMusic.pause();
    updatePowerBars();
    canvas.style.backgroundImage = 'none';
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = '#4a5568';
    ctx.fillRect(0, CANVAS_HEIGHT - 10, CANVAS_WIDTH, 10);
    gameHeader.style.display = 'block';
}

function updateHealthBars() {
    if (players.length < 2) return;
    player1HealthBar.style.width = `${(players[0].health / players[0].maxHealth) * 100}%`;
    player2HealthBar.style.width = `${(players[1].health / players[1].maxHealth) * 100}%`;
}

function updatePowerBars() {
    if (players.length < 2) {
        player1PowerBar.style.width = '0%';
        player2PowerBar.style.width = '0%';
        return;
    };
    player1PowerBar.style.width = `${(players[0].power / players[0].maxPower) * 100}%`;
    player2PowerBar.style.width = `${(players[1].power / players[1].maxPower) * 100}%`;
    player1PowerBar.classList.toggle('super-charged', players[0].isSuperCharged);
    player2PowerBar.classList.toggle('super-charged', players[1].isSuperCharged);
}

function isAnySuperPowerActive() {
    return players.some(p => p.isDashing || p.isCastingCrack || p.isSwallowed || p.isStunned || p.activePiranhaProjectiles.length > 0 || p.activeMoneyWads.length > 0 || p.activeCalculators.length > 0 || p.activeKisses.length > 0 || p.activeTeddies.length > 0 || p.activePapers.length > 0);
}

function checkGameOver() {
    if (players.length < 2 || ((players[0].health <= 0 || players[1].health <= 0) && isAnySuperPowerActive())) return;

    let winner = null;
    if (players[0].health <= 0 && players[1].health <= 0) {
        winnerMessage.innerHTML = `<span class="text-4xl font-bold text-yellow-400">¡EMPATE!</span>`;
    } else if (players[1].health <= 0) {
        winner = players[0];
    } else if (players[0].health <= 0) {
        winner = players[1];
    }

    if (winner || (players[0].health <= 0 && players[1].health <= 0)) {
        gameActive = false;
        new Audio('audio/9BH.wav').play().catch(e => {});
        gameOverModal.classList.remove('hidden');
        startMessageOverlay.classList.add('hidden');
        gameOverMessage.textContent = "¡Fin del Combate!";
        if (winner) {
            const winnerAsset = characterAssets.find(c => c.name === winner.name);
            winnerMessage.innerHTML = `<p class="text-2xl mb-4">El ganador es</p><img src="${winnerAsset.previewImage}" class="w-32 h-32 mx-auto rounded-full border-4 border-yellow-400 mb-4 object-contain" style="image-rendering: pixelated;"/><p class="text-4xl font-bold text-yellow-400">${winner.name.toUpperCase()}</p>`;
        }
        if (backgroundMusic) backgroundMusic.pause();
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
        if (effect.lifetime <= 0) activeHitEffects.splice(i, 1);
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
        if (p.alpha <= 0) smokeParticles.splice(i, 1);
    }
}

function gameLoop() {
    if (!gameActive) return;
    
    ctx.save();
    if (screenShakeTimeLeft > 0) {
        const offsetX = (Math.random() - 0.5) * 2 * screenShakeMagnitude;
        const offsetY = (Math.random() - 0.5) * 2 * screenShakeMagnitude;
        ctx.translate(offsetX, offsetY);
        screenShakeTimeLeft--;
        if (screenShakeTimeLeft <= 0) screenShakeMagnitude = 0;
    }
    
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    if(!canvas.style.backgroundImage || canvas.style.backgroundImage === 'none') {
        ctx.fillStyle = '#4a5568';
        ctx.fillRect(0, CANVAS_HEIGHT - 10, CANVAS_WIDTH, 10);
    }

    players.forEach(player => { player.update(); player.draw(); });
    drawHitEffects();
    drawSmoke();

    ctx.restore();
    requestAnimationFrame(gameLoop);
}

continueButton.addEventListener('click', () => {
    splashScreen.style.display = 'none';
    gameWrapper.style.display = 'block';
    gameHeader.style.display = 'block';
    document.body.style.overflow = 'auto';
    
    preloadAssets(() => {
        createCharacterSelectionUI();
        resetSelectionScreen();
    });
});

restartButton.addEventListener('click', () => {
    resetSelectionScreen();
});

startButton.addEventListener('click', initGame);

canvas.addEventListener('click', () => {
    if (gameActive && players.length > 0 && players[0].isPlayer1) {
        players[0].chargePowerOnClick();
    }
});

window.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && gameActive && players.length > 0 && players[0].isPlayer1 && players[0].isSuperCharged) {
        event.preventDefault();
        players[0].punch();
    }
});

gameHeader.style.display = 'none';

backgroundMusic = new Audio('audio/playbackbattle.mp3');
backgroundMusic.loop = true;
