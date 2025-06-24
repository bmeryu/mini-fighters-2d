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
// SOLUCIÓN 2: Aumentar la ganancia de poder para que sea más dinámico
const POWER_GAIN_PER_CLICK = 4; // Era 0.5, ahora 30-40 clics llenan la barra.

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
    { name: "La Ex", baseColor: '#c0392b', previewImage: "img/personaje2-cabeza.png", textures: { head: "img/personaje2-cabeza.png", torso: "img/personaje2-torso.png", upperArm: "img/personaje2-brazos.png", foreArm: "img/personaje2-antebrazos.png", thigh: "img/personaje2-muslos.png", lowerLeg: "img/personaje2-piernasbajas.png", glove_r: "img/personaje2-guantes-d.png", glove_l: "img/personaje2-guantes-i.png", glove: null, shoe: "img/personaje2-zapatos.png", superEffectTexture: "img/personaje2-super-effect.png" } },
    { name: "Burric", baseColor: '#27ae60', previewImage: "img/personaje3-cabeza.png", textures: { head: "img/personaje3-cabeza.png", torso: "img/personaje3-torso.png", upperArm: "img/personaje3-brazos.png", foreArm: "img/personaje3-antebrazos.png", thigh: "img/personaje3-muslos.png", lowerLeg: "img/personaje3-piernasbajas.png", glove_r: "img/personaje3-guantes-d.png", glove_l: "img/personaje3-guantes-i.png", glove: null, shoe: "img/personaje3-zapatos.png", superEffectTexture: "img/personaje3-super-effect.png" } },
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

        // Las texturas ya están precargadas, así que solo las asignamos
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
            // Este fallback ya no debería ser necesario con el preloader, pero es bueno tenerlo.
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
	
    // ... (El resto de las funciones de dibujo de proyectiles como drawPiranhaProjectiles, drawMoneyWads, etc., permanecen iguales)...

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
        
        // Aquí irían las llamadas a las funciones de dibujo de proyectiles
        // this.drawPiranhaProjectiles(); etc.
        
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
                     this.kick(); // La IA usará superpoder con patada
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
	
    // ... (El resto de las funciones de `update` de proyectiles, etc., permanecen iguales) ...

    update() {
        if (this.isSwallowed) {
            this.swallowedTimer--;
            if (this.swallowedTimer <= 0) {
                this.isSwallowed = false;
                this.y = -this.height; // Respawn arriba
            }
            return;
        }
        if (this.isStunned) {
            this.stunTimer--;
            if (this.stunTimer <= 0) this.isStunned = false;
            return;
        }
        if (!this.isPlayer1) this.updateAI();

        // ... (El resto de la lógica de `update` permanece igual) ...

        this.x += this.velocityX;
        this.velocityY += GRAVITY;
        this.y += this.velocityY;

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
        const superAttackMap = {
            "Piraña": () => { console.log("Lanzando Pirañas!"); /*this.launchPiranhaProjectiles()*/ },
            "La Ex": () => { console.log("Lanzando Dinero!"); /*this.launchMoneyWadAttack()*/ },
            // ... Mapear todos los demás personajes
        };
        const attackFn = superAttackMap[this.name];
        if (attackFn) {
            attackFn();
            return true; // Indica que se usó un superpoder especial
        }
        return false; // Indica que es un superpoder genérico (golpe/patada más fuerte)
    }
    
    // SOLUCIÓN 3: Lógica de ataque corregida
    _performAttack(isKick) {
        if ((this.isPunching || this.isKicking) || (Date.now() - this.lastAttackTime < this.attackCooldown)) return;

        let damage = isKick ? this.kickDamage : this.punchDamage;
        const range = isKick ? this.kickRange : this.punchRange;
        const isSuperMove = this.isSuperCharged;
        let isSpecialSuper = false;

        if (isSuperMove) {
            isSpecialSuper = this._launchSuperAttack();
            if (isSpecialSuper) {
                damage = 0; // El daño lo manejan los proyectiles/efectos
            } else {
                damage = isKick ? SUPER_KICK_DAMAGE : SUPER_PUNCH_DAMAGE; // Super genérico
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
        
        // Gasta el poder SIEMPRE que se usa un super
        if (isSuperMove) {
            this.power = 0;
            this.isSuperCharged = false;
            updatePowerBars();
        }
        
        // Si es un super especial (proyectiles, etc.), no hacemos chequeo de golpe aquí.
        if (isSpecialSuper) {
            return;
        }

        const opponent = players.find(p => p !== this);
        if (!opponent || opponent.isSwallowed) return;

        // Lógica de hitbox para ataques normales y supers genéricos
        const attackHitbox = { x: this.x + (this.facingRight ? this.width / 2 : -range), y: this.y, width: range, height: this.height };

        if (attackHitbox.x < opponent.x + opponent.width && attackHitbox.x + attackHitbox.width > opponent.x &&
            attackHitbox.y < opponent.y + opponent.height && attackHitbox.y + attackHitbox.height > opponent.y) {
            opponent.takeDamage(damage, this.facingRight);
            if (!isSuperMove) {
                this.gainPower(POWER_GAIN_PER_HIT);
            }
        }
    }


    punch() { this._performAttack(false); }
    kick() { this._performAttack(true); }
	
    takeDamage(damage, attackerFacingRight) {
        if (this.isDashing || this.isSwallowed) return;
        this.health = Math.max(0, this.health - damage);
        new Audio('audio/2BH.wav').play().catch(e => {});
        if (!this.isSwallowed) {
            this.x += attackerFacingRight ? this.knockbackStrength : -this.knockbackStrength;
            this.velocityY = -this.knockbackStrength / 2;
        }
        activeHitEffects.push({ text: hitWords[Math.floor(Math.random() * hitWords.length)], x: this.x + this.width / 2, y: this.y + this.height / 3, color: hitWordColors[Math.floor(Math.random() * hitWordColors.length)], alpha: 1.0, size: 24 + Math.random() * 16, rotation: (Math.random() - 0.5) * 0.5, lifetime: HIT_EFFECT_LIFETIME });
        updateHealthBars();
        checkGameOver();
    }
}

// ... El resto de funciones como createCharacterSelectionUI, handleCharacterSelect, initGame, etc., se mantienen muy similares

function initGame() {
    if (playerSelectedCharIndex === -1 || pcSelectedCharIndex === -1) return;

    activeHitEffects = [];
    players = [
        new Player(100, CANVAS_HEIGHT, characterAssets[playerSelectedCharIndex], true, true),
        new Player(CANVAS_WIDTH - 150, CANVAS_HEIGHT, characterAssets[pcSelectedCharIndex], false, false)
    ];

    player1NameDisplay.textContent = players[0].name;
    player2NameDisplay.textContent = players[1].name;
    updateHealthBars();
    updatePowerBars();

    gameActive = true;
    gameOverModal.classList.add('hidden');
    controlsPanel.style.display = 'none';

    const possibleBgs = [...(characterBackgrounds[players[0].name] || []), ...(characterBackgrounds[players[1].name] || [])];
    if (possibleBgs.length > 0) {
        canvas.style.backgroundImage = `url('${possibleBgs[Math.floor(Math.random() * possibleBgs.length)]}')`;
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

function gameLoop() {
    if (!gameActive) return;
    
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    if (!canvas.style.backgroundImage || canvas.style.backgroundImage === 'none') {
        ctx.fillStyle = '#4a5568';
        ctx.fillRect(0, CANVAS_HEIGHT - 10, CANVAS_WIDTH, 10);
    }

    players.forEach(player => { player.update(); player.draw(); });
    // drawHitEffects();
    // drawSmoke();

    requestAnimationFrame(gameLoop);
}

// =================================================================
// 4. SOLUCIÓN 1: PRE-CARGADOR DE ASSETS
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

    // Mostrar mensaje de carga
    selectionPrompt.textContent = `Cargando recursos... 0 / ${totalAssets}`;

    assetUrls.forEach(url => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
            loadedAssets++;
            assetCache[url] = img;
            selectionPrompt.textContent = `Cargando recursos... ${loadedAssets} / ${totalAssets}`;
            if (loadedAssets === totalAssets) {
                selectionPrompt.textContent = "¡Recursos cargados!";
                setTimeout(callback, 500); // Pequeña pausa para que el usuario lea el mensaje
            }
        };
        img.onerror = () => {
            console.error(`Error al cargar el asset: ${url}`);
            loadedAssets++; // Contamos el asset con error para no bloquear la carga
             if (loadedAssets === totalAssets) {
                callback();
            }
        };
    });
}


// =================================================================
// 5. EJECUCIÓN INICIAL Y EVENT LISTENERS
// =================================================================
continueButton.addEventListener('click', () => {
    splashScreen.style.display = 'none';
    gameWrapper.style.display = 'block';
    gameHeader.style.display = 'block';
    document.body.style.overflow = 'auto';
    
    // Iniciar la precarga de assets DESPUÉS de aceptar la advertencia
    preloadAssets(() => {
        // Una vez cargado, preparamos la pantalla de selección
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
        players[0].kick(); // Usamos kick o punch para activar la lógica del superpoder
    }
});

// Inicialización de la aplicación
// Nota: La creación de UI y el reseteo ahora se llaman dentro del callback de preloadAssets
gameHeader.style.display = 'none'; // Corrección para el estado inicial

backgroundMusic = new Audio('audio/playbackbattle.mp3');
backgroundMusic.loop = true;

// Funciones restantes (resetSelectionScreen, createCharacterSelectionUI, etc.)
// Deben permanecer en el código. Asegúrate de que estén definidas.
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

function resetSelectionScreen() {
    gameOverModal.classList.add('hidden');
    controlsPanel.style.display = 'block';
    playerSelectedCharIndex = -1;
    pcSelectedCharIndex = -1;
    p1SelectedCharImg.src = "https://placehold.co/120x120/455a64/e0e0e0?text=P1";
    p1SelectedCharName.textContent = "- Vacío -";
    p2SelectedCharImg.src = "https://placehold.co/120x120/455a64/e0e0e0?text=PC";
    p2SelectedCharName.textContent = "- Al Azar -";
    document.querySelectorAll('.character-portrait').forEach(el => el.classList.remove('selected-p1', 'selected-p2'));
    selectionPrompt.textContent = "Elige tu luchador para empezar";
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

function checkGameOver() {
    // Implementación de checkGameOver
}
