// Ensure scrolling is enabled and not blocked by any style
(function ensureScrolling() {
  const style = document.createElement('style');
  style.innerHTML = `
    html, body {
      height: 100%;
      overflow-y: auto !important;
    }
    body {
      position: relative;
    }
    #app {
      min-height: 100vh;
      overflow: visible !important;
    }
  `;
  document.head.appendChild(style);
})();

const fs = require('fs');
const path = require('path');
const saveFilePath = path.join(__dirname, 'jokers_progress.json');

const jokers = [
  { name: "8 Ball", file: "Assets/Joker Images/Jokers/Standard and Special/8_Ball.png", gold: false },
  { name: "Abstract Joker", file: "Assets/Joker Images/Jokers/Standard and Special/Abstract_Joker.png", gold: false },
  { name: "Acrobat", file: "Assets/Joker Images/Jokers/Standard and Special/Acrobat.png", gold: false },
  { name: "Ancient Joker", file: "Assets/Joker Images/Jokers/Standard and Special/Ancient_Joker.png", gold: false },
  { name: "Arrowhead", file: "Assets/Joker Images/Jokers/Standard and Special/Arrowhead.png", gold: false },
  { name: "Astronomer", file: "Assets/Joker Images/Jokers/Standard and Special/Astronomer.png", gold: false },
  { name: "Banner", file: "Assets/Joker Images/Jokers/Standard and Special/Banner.png", gold: false },
  { name: "Baron", file: "Assets/Joker Images/Jokers/Standard and Special/Baron.png", gold: false },
  { name: "Baseball Card", file: "Assets/Joker Images/Jokers/Standard and Special/Baseball_Card.png", gold: false },
  { name: "Blackboard", file: "Assets/Joker Images/Jokers/Standard and Special/Blackboard.png", gold: false },
  { name: "Bloodstone", file: "Assets/Joker Images/Jokers/Standard and Special/Bloodstone.png", gold: false },
  { name: "Blueprint", file: "Assets/Joker Images/Jokers/Standard and Special/Blueprint.png", gold: false },
  { name: "Blue Joker", file: "Assets/Joker Images/Jokers/Standard and Special/Blue_Joker.png", gold: false },
  { name: "Bootstraps", file: "Assets/Joker Images/Jokers/Standard and Special/Bootstraps.png", gold: false },
  { name: "Brainstorm", file: "Assets/Joker Images/Jokers/Standard and Special/Brainstorm.png", gold: false },
  { name: "Bull", file: "Assets/Joker Images/Jokers/Standard and Special/Bull.png", gold: false },
  { name: "Burglar", file: "Assets/Joker Images/Jokers/Standard and Special/Burglar.png", gold: false },
  { name: "Burnt Joker", file: "Assets/Joker Images/Jokers/Standard and Special/Burnt_Joker.png", gold: false },
  { name: "Business Card", file: "Assets/Joker Images/Jokers/Standard and Special/Business_Card.png", gold: false },
  { name: "Campfire", file: "Assets/Joker Images/Jokers/Standard and Special/Campfire.png", gold: false },
  { name: "Card Sharp", file: "Assets/Joker Images/Jokers/Standard and Special/Card_Sharp.png", gold: false },
  { name: "Cartomancer", file: "Assets/Joker Images/Jokers/Standard and Special/Cartomancer.png", gold: false },
  { name: "Castle", file: "Assets/Joker Images/Jokers/Standard and Special/Castle.png", gold: false },
  { name: "Cavendish", file: "Assets/Joker Images/Jokers/Standard and Special/Cavendish.png", gold: false },
  { name: "Ceremonial Dagger", file: "Assets/Joker Images/Jokers/Standard and Special/Ceremonial_Dagger.png", gold: false },
  { name: "Certificate", file: "Assets/Joker Images/Jokers/Standard and Special/Certificate.png", gold: false },
  { name: "Chaos the Clown", file: "Assets/Joker Images/Jokers/Standard and Special/Chaos_the_Clown.png", gold: false },
  { name: "Clever Joker", file: "Assets/Joker Images/Jokers/Standard and Special/Clever_Joker.png", gold: false },
  { name: "Cloud 9", file: "Assets/Joker Images/Jokers/Standard and Special/Cloud_9.png", gold: false },
  { name: "Constellation", file: "Assets/Joker Images/Jokers/Standard and Special/Constellation.png", gold: false },
  { name: "Crafty Joker", file: "Assets/Joker Images/Jokers/Standard and Special/Crafty_Joker.png", gold: false },
  { name: "Crazy Joker", file: "Assets/Joker Images/Jokers/Standard and Special/Crazy_Joker.png", gold: false },
  { name: "Credit Card", file: "Assets/Joker Images/Jokers/Standard and Special/Credit_Card.png", gold: false },
  { name: "Delayed Gratification", file: "Assets/Joker Images/Jokers/Standard and Special/Delayed_Gratification.png", gold: false },
  { name: "Devious Joker", file: "Assets/Joker Images/Jokers/Standard and Special/Devious_Joker.png", gold: false },
  { name: "Diet Cola", file: "Assets/Joker Images/Jokers/Standard and Special/Diet_Cola.png", gold: false },
  { name: "DNA", file: "Assets/Joker Images/Jokers/Standard and Special/DNA.png", gold: false },
  { name: "Driver's License", file: "Assets/Joker Images/Jokers/Standard and Special/Driver's_License.png", gold: false },
  { name: "Droll Joker", file: "Assets/Joker Images/Jokers/Standard and Special/Droll_Joker.png", gold: false },
  { name: "Drunkard", file: "Assets/Joker Images/Jokers/Standard and Special/Drunkard.png", gold: false },
  { name: "Dusk", file: "Assets/Joker Images/Jokers/Standard and Special/Dusk.png", gold: false },
  { name: "Egg", file: "Assets/Joker Images/Jokers/Standard and Special/Egg.png", gold: false },
  { name: "Erosion", file: "Assets/Joker Images/Jokers/Standard and Special/Erosion.png", gold: false },
  { name: "Even Steven", file: "Assets/Joker Images/Jokers/Standard and Special/Even_Steven.png", gold: false },
  { name: "Faceless Joker", file: "Assets/Joker Images/Jokers/Standard and Special/Faceless_Joker.png", gold: false },
  { name: "Fibonacci", file: "Assets/Joker Images/Jokers/Standard and Special/Fibonacci.png", gold: false },
  { name: "Flash Card", file: "Assets/Joker Images/Jokers/Standard and Special/Flash_Card.png", gold: false },
  { name: "Flower Pot", file: "Assets/Joker Images/Jokers/Standard and Special/Flower_Pot.png", gold: false },
  { name: "Fortune Teller", file: "Assets/Joker Images/Jokers/Standard and Special/Fortune_Teller.png", gold: false },
  { name: "Four Fingers", file: "Assets/Joker Images/Jokers/Standard and Special/Four_Fingers.png", gold: false },
  { name: "Gift Card", file: "Assets/Joker Images/Jokers/Standard and Special/Gift_Card.png", gold: false },
  { name: "Glass Joker", file: "Assets/Joker Images/Jokers/Standard and Special/Glass_Joker.png", gold: false },
  { name: "Gluttonous Joker", file: "Assets/Joker Images/Jokers/Standard and Special/Gluttonous_Joker.png", gold: false },
  { name: "Golden Joker", file: "Assets/Joker Images/Jokers/Standard and Special/Golden_Joker.png", gold: false },
  { name: "Golden Ticket", file: "Assets/Joker Images/Jokers/Standard and Special/Golden_Ticket.png", gold: false },
  { name: "Greedy Joker", file: "Assets/Joker Images/Jokers/Standard and Special/Greedy_Joker.png", gold: false },
  { name: "Green Joker", file: "Assets/Joker Images/Jokers/Standard and Special/Green_Joker.png", gold: false },
  { name: "Gros Michel", file: "Assets/Joker Images/Jokers/Standard and Special/Gros_Michel.png", gold: false },
  { name: "Hack", file: "Assets/Joker Images/Jokers/Standard and Special/Hack.png", gold: false },
  { name: "Half Joker", file: "Assets/Joker Images/Jokers/Standard and Special/Half_Joker.png", gold: false },
  { name: "Hallucination", file: "Assets/Joker Images/Jokers/Standard and Special/Hallucination.png", gold: false },
  { name: "Hanging Chad", file: "Assets/Joker Images/Jokers/Standard and Special/Hanging_Chad.png", gold: false },
  { name: "Hiker", file: "Assets/Joker Images/Jokers/Standard and Special/Hiker.png", gold: false },
  { name: "Hit the Road", file: "Assets/Joker Images/Jokers/Standard and Special/Hit_the_Road.png", gold: false },
  { name: "Hologram", file: "Assets/Joker Images/Jokers/Standard and Special/Hologram.png", gold: false },
  { name: "Ice Cream", file: "Assets/Joker Images/Jokers/Standard and Special/Ice_Cream.png", gold: false },
  { name: "Invisible Joker", file: "Assets/Joker Images/Jokers/Standard and Special/Invisible_Joker.png", gold: false },
  { name: "Joker", file: "Assets/Joker Images/Jokers/Standard and Special/Joker.png", gold: false },
  { name: "Joker Stencil", file: "Assets/Joker Images/Jokers/Standard and Special/Joker_Stencil.png", gold: false },
  { name: "Jolly Joker", file: "Assets/Joker Images/Jokers/Standard and Special/Jolly_Joker.png", gold: false },
  { name: "Juggler", file: "Assets/Joker Images/Jokers/Standard and Special/Juggler.png", gold: false },
  { name: "Loyalty Card", file: "Assets/Joker Images/Jokers/Standard and Special/Loyalty_Card.png", gold: false },
  { name: "Luchador", file: "Assets/Joker Images/Jokers/Standard and Special/Luchador.png", gold: false },
  { name: "Lucky Cat", file: "Assets/Joker Images/Jokers/Standard and Special/Lucky_Cat.png", gold: false },
  { name: "Lusty Joker", file: "Assets/Joker Images/Jokers/Standard and Special/Lusty_Joker.png", gold: false },
  { name: "Madness", file: "Assets/Joker Images/Jokers/Standard and Special/Madness.png", gold: false },
  { name: "Mad Joker", file: "Assets/Joker Images/Jokers/Standard and Special/Mad_Joker.png", gold: false },
  { name: "Mail in Rebate", file: "Assets/Joker Images/Jokers/Standard and Special/Mail-in_Rebate.png", gold: false },
  { name: "Marble Joker", file: "Assets/Joker Images/Jokers/Standard and Special/Marble_Joker.png", gold: false },
  { name: "Matador", file: "Assets/Joker Images/Jokers/Standard and Special/Matador.png", gold: false },
  { name: "Merry Andy", file: "Assets/Joker Images/Jokers/Standard and Special/Merry_Andy.png", gold: false },
  { name: "Midas Mask", file: "Assets/Joker Images/Jokers/Standard and Special/Midas_Mask.png", gold: false },
  { name: "Mime", file: "Assets/Joker Images/Jokers/Standard and Special/Mime.png", gold: false },
  { name: "Misprint", file: "Assets/Joker Images/Jokers/Standard and Special/Misprint.png", gold: false },
  { name: "Mr. Bones", file: "Assets/Joker Images/Jokers/Standard and Special/Mr._Bones.png", gold: false },
  { name: "Mystic Summit", file: "Assets/Joker Images/Jokers/Standard and Special/Mystic_Summit.png", gold: false },
  { name: "Obelisk", file: "Assets/Joker Images/Jokers/Standard and Special/Obelisk.png", gold: false },
  { name: "Odd Todd", file: "Assets/Joker Images/Jokers/Standard and Special/Odd_Todd.png", gold: false },
  { name: "Onyx Agate", file: "Assets/Joker Images/Jokers/Standard and Special/Onyx_Agate.png", gold: false },
  { name: "Oops! All 6s", file: "Assets/Joker Images/Jokers/Standard and Special/Oops!_All_6s.png", gold: false },
  { name: "Pareidolia", file: "Assets/Joker Images/Jokers/Standard and Special/Pareidolia.png", gold: false },
  { name: "Photograph", file: "Assets/Joker Images/Jokers/Standard and Special/Photograph.png", gold: false },
  { name: "Popcorn", file: "Assets/Joker Images/Jokers/Standard and Special/Popcorn.png", gold: false },
  { name: "Raised Fist", file: "Assets/Joker Images/Jokers/Standard and Special/Raised_Fist.png", gold: false },
  { name: "Ramen", file: "Assets/Joker Images/Jokers/Standard and Special/Ramen.png", gold: false },
  { name: "Red Card", file: "Assets/Joker Images/Jokers/Standard and Special/Red_Card.png", gold: false },
  { name: "Reserved Parking", file: "Assets/Joker Images/Jokers/Standard and Special/Reserved_Parking.png", gold: false },
  { name: "Ride the Bus", file: "Assets/Joker Images/Jokers/Standard and Special/Ride_the_Bus.png", gold: false },
  { name: "Riff Raff", file: "Assets/Joker Images/Jokers/Standard and Special/Riff-Raff.png", gold: false },
  { name: "Rocket", file: "Assets/Joker Images/Jokers/Standard and Special/Rocket.png", gold: false },
  { name: "Rough Gem", file: "Assets/Joker Images/Jokers/Standard and Special/Rough_Gem.png", gold: false },
  { name: "Runner", file: "Assets/Joker Images/Jokers/Standard and Special/Runner.png", gold: false },
  { name: "Satellite", file: "Assets/Joker Images/Jokers/Standard and Special/Satellite.png", gold: false },
  { name: "Scary Face", file: "Assets/Joker Images/Jokers/Standard and Special/Scary_Face.png", gold: false },
  { name: "Scholar", file: "Assets/Joker Images/Jokers/Standard and Special/Scholar.png", gold: false },
  { name: "Seance", file: "Assets/Joker Images/Jokers/Standard and Special/Seance.png", gold: false },
  { name: "Seeing Double", file: "Assets/Joker Images/Jokers/Standard and Special/Seeing_Double.png", gold: false },
  { name: "Seltzer", file: "Assets/Joker Images/Jokers/Standard and Special/Seltzer.png", gold: false },
  { name: "Shoot the Moon", file: "Assets/Joker Images/Jokers/Standard and Special/Shoot_the_Moon.png", gold: false },
  { name: "Shortcut", file: "Assets/Joker Images/Jokers/Standard and Special/Shortcut.png", gold: false },
  { name: "Showman", file: "Assets/Joker Images/Jokers/Standard and Special/Showman.png", gold: false },
  { name: "Sixth Sense", file: "Assets/Joker Images/Jokers/Standard and Special/Sixth_Sense.png", gold: false },
  { name: "Sly Joker", file: "Assets/Joker Images/Jokers/Standard and Special/Sly_Joker.png", gold: false },
  { name: "Smeared Joker", file: "Assets/Joker Images/Jokers/Standard and Special/Smeared_Joker.png", gold: false },
  { name: "Smiley Face", file: "Assets/Joker Images/Jokers/Standard and Special/Smiley_Face.png", gold: false },
  { name: "Sock and Buskin", file: "Assets/Joker Images/Jokers/Standard and Special/Sock_and_Buskin.png", gold: false },
  { name: "Space Joker", file: "Assets/Joker Images/Jokers/Standard and Special/Space_Joker.png", gold: false },
  { name: "Spare Trousers", file: "Assets/Joker Images/Jokers/Standard and Special/Spare_Trousers.png", gold: false },
  { name: "Splash", file: "Assets/Joker Images/Jokers/Standard and Special/Splash.png", gold: false },
  { name: "Square Joker", file: "Assets/Joker Images/Jokers/Standard and Special/Square_Joker.png", gold: false },
  { name: "Steel Joker", file: "Assets/Joker Images/Jokers/Standard and Special/Steel_Joker.png", gold: false },
  { name: "Stone Joker", file: "Assets/Joker Images/Jokers/Standard and Special/Stone_Joker.png", gold: false },
  { name: "Stuntman", file: "Assets/Joker Images/Jokers/Standard and Special/Stuntman.png", gold: false },
  { name: "Supernova", file: "Assets/Joker Images/Jokers/Standard and Special/Supernova.png", gold: false },
  { name: "Superposition", file: "Assets/Joker Images/Jokers/Standard and Special/Superposition.png", gold: false },
  { name: "Swashbuckler", file: "Assets/Joker Images/Jokers/Standard and Special/Swashbuckler.png", gold: false },
  { name: "The Duo", file: "Assets/Joker Images/Jokers/Standard and Special/The_Duo.png", gold: false },
  { name: "The Family", file: "Assets/Joker Images/Jokers/Standard and Special/The_Family.png", gold: false },
  { name: "The Idol", file: "Assets/Joker Images/Jokers/Standard and Special/The_Idol.png", gold: false },
  { name: "The Order", file: "Assets/Joker Images/Jokers/Standard and Special/The_Order.png", gold: false },
  { name: "The Tribe", file: "Assets/Joker Images/Jokers/Standard and Special/The_Tribe.png", gold: false },
  { name: "The Trio", file: "Assets/Joker Images/Jokers/Standard and Special/The_Trio.png", gold: false },
  { name: "Throwback", file: "Assets/Joker Images/Jokers/Standard and Special/Throwback.png", gold: false },
  { name: "To Do List", file: "Assets/Joker Images/Jokers/Standard and Special/To_Do_List.png", gold: false },
  { name: "To the Moon", file: "Assets/Joker Images/Jokers/Standard and Special/To_the_Moon.png", gold: false },
  { name: "Trading Card", file: "Assets/Joker Images/Jokers/Standard and Special/Trading_Card.png", gold: false },
  { name: "Troubadour", file: "Assets/Joker Images/Jokers/Standard and Special/Troubadour.png", gold: false },
  { name: "Turtle Bean", file: "Assets/Joker Images/Jokers/Standard and Special/Turtle_Bean.png", gold: false },
  { name: "Vagabond", file: "Assets/Joker Images/Jokers/Standard and Special/Vagabond.png", gold: false },
  { name: "Vampire", file: "Assets/Joker Images/Jokers/Standard and Special/Vampire.png", gold: false },
  { name: "Walkie Talkie", file: "Assets/Joker Images/Jokers/Standard and Special/Walkie_Talkie.png", gold: false },
  { name: "Wily Joker", file: "Assets/Joker Images/Jokers/Standard and Special/Wily_Joker.png", gold: false },
  { name: "Wrathful Joker", file: "Assets/Joker Images/Jokers/Standard and Special/Wrathful_Joker.png", gold: false },
  { name: "Zany Joker", file: "Assets/Joker Images/Jokers/Standard and Special/Zany_Joker.png", gold: false },
];

// --- RARITY ARRAYS (move these to top-level for global access) ---
const blueGlowJokers = [
  "8 Ball", "Joker", "Greedy Joker", "Lusty Joker", "Wrathful Joker", "Gluttonous Joker", "Jolly Joker", "Zany Joker", "Mad Joker", "Crazy Joker", "Droll Joker", "Sly Joker", "Wily Joker", "Clever Joker", "Crafty Joker", "Devious Joker", "Half Joker", "Credit Card", "Banner", "Mystic Summit", "Misprint", "Raised Fist", "Chaos the Clown",
  // Newly added jokers for blue glow:
  "Scary Face", "Abstract Joker", "Delayed Gratification", "Gros Michel", "Even Steven", "Odd Todd", "Scholar", "Business Card", "Supernova", "Ride the Bus", "Egg", "Runner", "Ice Cream", "Splash", "Blue Joker", "Faceless Joker", "Green Joker", "Superposition", "To Do List", "Cavendish", "Red Card", "Square Joker", "Riff Raff", "Photograph", "Reserved Parking", "Mail in Rebate", "Hallucination", "Fortune Teller", "Juggler", "Drunkard", "Golden Joker", "Popcorn", "Walkie Talkie", "Smiley Face", "Golden Ticket", "Swashbuckler", "Shoot the Moon", "Hanging Chad"
];
const greenGlowJokers = [
  "Joker Stencil", "Four Fingers", "Mime", "Ceremonial Dagger", "Marble Joker", "Loyalty Card", "Dusk", "Fibonacci", "Steel Joker", "Hack", "Pareidolia", "Space Joker", "Burglar", "Blackboard", "Sixth Sense", "Constellation", "Hiker", "Card Sharp", "Madness", "Seance", "Vampire", "Shortcut", "Hologram", "Cloud 9", "Rocket", "Midas Mask", "Luchador", "Gift Card", "Turtle Bean", "Erosion", "To the Moon", "Stone Joker", "Lucky Cat", "Bull", "Diet Cola", "Trading Card", "Flash Card", "Spare Trousers", "Ramen", "Seltzer", "Castle", "Mr. Bones", "Acrobat", "Sock and Buskin", "Troubadour", "Certificate", "Smeared Joker", "Throwback", "Rough Gem", "Bloodstone", "Arrowhead", "Onyx Agate", "Glass Joker", "Showman", "Flower Pot", "Merry Andy", "Oops! All 6s", "The Idol", "Seeing Double", "Matador", "Satellite", "Cartomancer", "Astronomer", "Bootstraps"
];
const redGlowJokers = [
  "Vagabond", "Baron", "Obelisk", "Ancient Joker", "Campfire", "Blueprint", "Wee Joker", "Hit the Road", "The Duo", "The Trio", "The Family", "The Order", "The Tribe", "Stuntman", "Invisible Joker", "Brainstorm", "Driver's License", "Burnt Joker", "Baseball Card", "DNA"
];

// Render function
function renderJokers(filter = "", goldFilter = "all", rarityFilter = "all") {
  const app = document.getElementById("app");
  app.innerHTML = '';
  // document.body.style.background = "#23242b"; // Removed to restore scrolling and background image
  document.body.style.color = "#f3f3f3";
  app.style.display = "flex";
  app.style.flexWrap = "wrap";
  app.style.justifyContent = "center";
  app.style.gap = "32px";
  app.style.padding = "32px 0";
  app.style.margin = "0 80px";

  // Filter jokers by name and gold status
  let filteredJokers = jokers.filter(joker =>
    joker.name.toLowerCase().includes(filter.toLowerCase())
  );
  if (goldFilter === 'gold') {
    filteredJokers = filteredJokers.filter(j => j.gold);
  } else if (goldFilter === 'nongold') {
    filteredJokers = filteredJokers.filter(j => !j.gold);
  }

  // --- RARITY FILTERING ---
  if (rarityFilter === 'common') {
    filteredJokers = filteredJokers.filter(joker => {
      return blueGlowJokers.includes(joker.name);
    });
  } else if (rarityFilter === 'uncommon') {
    filteredJokers = filteredJokers.filter(joker => {
      return greenGlowJokers.includes(joker.name);
    });
  } else if (rarityFilter === 'rare') {
    filteredJokers = filteredJokers.filter(joker => {
      return redGlowJokers.includes(joker.name);
    });
  }
  // ------------------------

  filteredJokers.forEach((joker) => {
    const index = jokers.indexOf(joker);

    const container = document.createElement("div");
    container.className = "joker-container";
    container.style.position = "relative";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "center";
    container.style.margin = "18px";
    container.style.width = "170px";
    container.style.background = "none";

    // Name label above cardWrapper
    const nameLabel = document.createElement("div");
    nameLabel.className = "joker-name-label";
    nameLabel.textContent = joker.name;
    nameLabel.style.fontFamily = "'balatro', 'Balatro', 'Arial', sans-serif";
    nameLabel.style.fontSize = "1.08em";
    nameLabel.style.letterSpacing = "0.01em";
    nameLabel.style.textAlign = "center";
    nameLabel.style.color = "#ffe066";
    nameLabel.style.textShadow = "0 2px 8px #181a20, 0 1px 0 #000";
    nameLabel.style.marginBottom = "8px";
    nameLabel.style.userSelect = "none";
    nameLabel.style.width = "160px"; // Match image width for centering
    nameLabel.style.display = "block";
    nameLabel.style.marginLeft = "auto";
    nameLabel.style.marginRight = "auto";
    container.appendChild(nameLabel);

    // Card wrapper for image and overlays
    const cardWrapper = document.createElement("div");
    cardWrapper.style.position = "relative";
    cardWrapper.style.display = "inline-block";
    cardWrapper.style.width = "150px";
    cardWrapper.style.height = "220px";
    cardWrapper.style.cursor = "pointer";
    // Add faint blue glow for select jokers
    if (blueGlowJokers.includes(joker.name)) {
      cardWrapper.style.boxShadow = "0 0 32px 8px rgba(0,180,255,0.22), 0 2px 12px 0 rgba(0,0,0,0.18)";
    } else if (greenGlowJokers.includes(joker.name)) {
      cardWrapper.style.boxShadow = "0 0 32px 8px rgba(80,255,120,0.22), 0 2px 12px 0 rgba(0,0,0,0.18)";
    } else if (redGlowJokers.includes(joker.name)) {
      cardWrapper.style.boxShadow = "0 0 32px 8px rgba(255,60,60,0.22), 0 2px 12px 0 rgba(0,0,0,0.18)";
    }

    // Joker image
    const image = document.createElement("img");
    image.className = "joker-card";
    image.src = joker.file;
    image.alt = joker.name;
    image.style.width = "160px";
    image.style.height = "220px";
    image.style.position = "relative";
    image.style.display = "block";
    image.style.marginBottom = "0";
    cardWrapper.appendChild(image);

    // Gold sticker (if gold)
    let sticker = null;
    if (joker.gold) {
      sticker = document.createElement("img");
      sticker.src = "Assets/Joker Images/Gold_Sticker.png";
      sticker.alt = "Gold Sticker";
      sticker.className = "gold-sticker";
      sticker.style.position = "absolute";
      sticker.style.top = "15px";
      sticker.style.right = "5px";
      sticker.style.width = "46px";
      sticker.style.pointerEvents = "none";
      sticker.style.zIndex = "2";
      cardWrapper.appendChild(sticker);
    }

    // Add hover tilt effect to the wrapper (so sticker, image, and overlays tilt together)
    cardWrapper.style.transition = "transform 0.15s cubic-bezier(.25,.46,.45,.94)";
    cardWrapper.style.transform = "perspective(600px) rotateY(var(--tiltX,0deg)) rotateX(var(--tiltY,0deg))";
    cardWrapper.addEventListener("mousemove", (e) => {
      const bounds = cardWrapper.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const y = e.clientY - bounds.top;
      const centerX = bounds.width / 2;
      const centerY = bounds.height / 2;
      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;
      cardWrapper.style.setProperty("--tiltX", `${deltaX * 8}deg`);
      cardWrapper.style.setProperty("--tiltY", `${-deltaY * 8}deg`);
    });
    cardWrapper.addEventListener("mouseleave", (e) => {
      cardWrapper.style.setProperty("--tiltX", "0deg");
      cardWrapper.style.setProperty("--tiltY", "0deg");
    });

    // When clicked, show the gold or oops button (always inside cardWrapper)
    cardWrapper.onclick = (e) => {
      if (e.target === cardWrapper || e.target === image || (sticker && e.target === sticker)) {
        selectedJokerIndex = index;
        createGoldStickerButton(index, cardWrapper, image);
      }
    };

    container.appendChild(cardWrapper);
    app.appendChild(container);
  });
}

let selectedJokerIndex = null;

function createGoldStickerButton(index, cardWrapper, imageElement) {
  // Remove existing gold and oops buttons if they exist (from any card)
  const existingGold = document.getElementById("gold-button");
  if (existingGold) existingGold.remove();
  const existingOops = document.getElementById("oops-button");
  if (existingOops) existingOops.remove();

  // Button size scale
  const scale = 1.125;
  const basePadding = 8;
  const baseFontSize = 16;
  const padding = `${basePadding * scale}px ${basePadding * 2 * scale}px`;
  const fontSize = `${baseFontSize * scale}px`;

  // Show only the appropriate button
  if (!jokers[index].gold) {
    // Gold button at bottom center of the card
    const goldButton = document.createElement("button");
    goldButton.id = "gold-button";
    goldButton.textContent = "Gold";
    goldButton.className = "gold-button";
    goldButton.style.position = "absolute";
    goldButton.style.left = "52%";
    goldButton.style.bottom = "-67.46px"; 
    goldButton.style.transform = "translateX(-50%)";
    goldButton.style.zIndex = "3";
    goldButton.style.padding = padding;
    goldButton.style.backgroundColor = "#ffe066";
    goldButton.style.color = "#181a20";
    goldButton.style.fontWeight = "bold";
    goldButton.style.border = "none";
    goldButton.style.borderRadius = `0 0 ${8 * scale}px ${8 * scale}px`;
    goldButton.style.cursor = "pointer";
    goldButton.style.boxShadow = "0 0 10px rgba(0,0,0,0.2)";
    goldButton.style.fontSize = fontSize;
    goldButton.style.transition = "background 0.15s";
    goldButton.style.height = `${basePadding * scale * 8}px`;
    goldButton.style.display = "flex";
    goldButton.style.alignItems = "center";
    goldButton.style.justifyContent = "center";
    goldButton.onmouseenter = () => {
      goldButton.style.backgroundColor = "#d6b94d";
    };
    goldButton.onmouseleave = () => {
      goldButton.style.backgroundColor = "#ffe066";
    };
    cardWrapper.appendChild(goldButton);
    goldButton.onclick = (e) => {
      e.stopPropagation();
      jokers[index].gold = true;
      selectedJokerIndex = null;
      goldButton.remove();
      // Only update this card visually
      let sticker = cardWrapper.querySelector('.gold-sticker');
      if (!sticker) {
        sticker = document.createElement("img");
        sticker.src = "Assets/Joker Images/Gold_Sticker.png";
        sticker.alt = "Gold Sticker";
        sticker.className = "gold-sticker";
        sticker.style.position = "absolute";
        sticker.style.top = "15px";
        sticker.style.right = "5px";
        sticker.style.width = "46px";
        sticker.style.pointerEvents = "none";
        sticker.style.zIndex = "2";
        // --- SLAM ANIMATION ---
        sticker.style.transform = "scale(2.2) rotate(-18deg)";
        sticker.style.opacity = "0.2";
        sticker.style.transition = "transform 0.18s cubic-bezier(.7,1.7,.3,1), opacity 0.13s";
        cardWrapper.appendChild(sticker);
        setTimeout(() => {
          sticker.style.transform = "scale(1) rotate(0deg)";
          sticker.style.opacity = "1";
        }, 10);
      }
      cardWrapper.style.setProperty("--tiltX", "0deg");
      cardWrapper.style.setProperty("--tiltY", "0deg");
      saveProgress();
    };
  } else {
    // Oops! button at right center of the card
    const oopsButton = document.createElement("button");
    oopsButton.id = "oops-button";
    oopsButton.textContent = "Oops!";
    oopsButton.className = "oops-button";
    oopsButton.style.position = "absolute";
    oopsButton.style.right = "-95px"; // Moved right by 10px
    oopsButton.style.top = "50%";
    oopsButton.style.transform = "translateY(-50%)";
    oopsButton.style.zIndex = "3";
    oopsButton.style.padding = padding;
    oopsButton.style.height = `${basePadding * scale * 8}px`;
    oopsButton.style.display = "flex";
    oopsButton.style.alignItems = "center";
    oopsButton.style.justifyContent = "center";
    oopsButton.style.backgroundColor = "#d7263d";
    oopsButton.style.color = "white";
    oopsButton.style.fontWeight = "bold";
    oopsButton.style.border = "none";
    oopsButton.style.borderRadius = `0 ${8 * scale}px ${8 * scale}px 0`;
    oopsButton.style.cursor = "pointer";
    oopsButton.style.boxShadow = "0 0 10px rgba(0,0,0,0.2)";
    oopsButton.style.fontSize = fontSize;
    oopsButton.style.transition = "background 0.15s";
    oopsButton.onmouseenter = () => {
      oopsButton.style.backgroundColor = "#a81c2e";
    };
    oopsButton.onmouseleave = () => {
      oopsButton.style.backgroundColor = "#d7263d";
    };
    cardWrapper.appendChild(oopsButton);
    oopsButton.onclick = (e) => {
      e.stopPropagation();
      jokers[index].gold = false;
      selectedJokerIndex = null;
      oopsButton.remove();
      let sticker = cardWrapper.querySelector('.gold-sticker');
      if (sticker) animateGoldStickerRemoval(sticker);
      cardWrapper.style.setProperty("--tiltX", "0deg");
      cardWrapper.style.setProperty("--tiltY", "0deg");
      saveProgress();
    };
  }
}

function animateGoldStickerRemoval(stickerElement) {
  // Only animate the gold sticker fading out
  stickerElement.style.transition = "opacity 0.3s ease, transform 0.1s ease";
  stickerElement.style.transform = "scale(1.1)";
  setTimeout(() => {
    stickerElement.style.transform = "scale(0.9)";
    stickerElement.style.opacity = "0.0"; // fade out
  }, 100);

  // Remove sticker after animation
  setTimeout(() => {
    if (stickerElement && stickerElement.parentNode) {
      stickerElement.parentNode.removeChild(stickerElement);
    }
  }, 400);
}

// Add search bar to the top of the app
function addSearchBar() {
  // Move the title above the search/filter bar
  let title = document.querySelector('.balatro-title');
  if (title) title.remove();
  title = document.createElement('h1');
  title.className = 'balatro-title';
  title.textContent = 'Gold Sticker Tracker';
  document.body.insertBefore(title, document.body.firstChild);

  // Remove old search bar if present
  let oldBar = document.getElementById("joker-search-bar");
  if (oldBar && oldBar.parentElement) oldBar.parentElement.remove();

  // Create wrapper
  let wrapper = document.querySelector('.search-bar-wrapper');
  if (!wrapper) {
    wrapper = document.createElement('div');
    wrapper.className = 'search-bar-wrapper';
    wrapper.style.display = 'flex';
    wrapper.style.justifyContent = 'center';
    wrapper.style.alignItems = 'flex-start';
    wrapper.style.marginTop = '16px';
    document.body.insertBefore(wrapper, title.nextSibling);
  } else {
    wrapper.innerHTML = '';
    wrapper.style.marginTop = '16px';
    wrapper.style.alignItems = 'flex-start';
    if (wrapper.previousSibling !== title) {
      document.body.insertBefore(wrapper, title.nextSibling);
    }
  }

  // Reset button (fixed to left side)
  let resetBtn = document.createElement('button');
  resetBtn.id = 'reset-btn';
  resetBtn.textContent = 'Reset';
  resetBtn.style.background = '#d7263d'; // red
  resetBtn.style.color = '#fff'; // white letters
  resetBtn.style.border = '1.5px solid #d7263d';
  resetBtn.style.borderRadius = '8px';
  resetBtn.style.padding = '10px 18px';
  resetBtn.style.fontSize = '1em';
  resetBtn.style.cursor = 'pointer';
  resetBtn.style.fontWeight = 'bold';
  resetBtn.style.transition = 'background 0.15s, color 0.15s, border 0.15s';
  resetBtn.style.position = 'absolute';
  resetBtn.style.left = '32px';
  resetBtn.style.top = '32px';
  resetBtn.style.zIndex = '10';
  resetBtn.onmouseenter = () => { resetBtn.style.background = '#a81c2e'; };
  resetBtn.onmouseleave = () => { resetBtn.style.background = '#d7263d'; };
  resetBtn.onclick = () => {
    // Animate all gold stickers fading out
    const stickers = document.querySelectorAll('.gold-sticker');
    stickers.forEach(sticker => {
      animateGoldStickerRemoval(sticker);
    });
    // Update data and save after animation
    jokers.forEach(j => j.gold = false);
    setTimeout(() => {
      saveProgress();
      renderJokers();
    }, 420); // Wait for fade animation to finish
  };
  document.body.appendChild(resetBtn);

  // Search input (in its own container)
  let searchContainer = document.createElement('div');
  searchContainer.style.display = 'flex';
  searchContainer.style.alignItems = 'center';
  searchContainer.style.background = 'none';
  searchContainer.style.marginRight = '32px';
  searchContainer.style.flexDirection = 'column';
  searchContainer.style.width = '340px';
  searchContainer.style.position = 'relative';

  let searchBar = document.createElement("input");
  searchBar.type = "text";
  searchBar.id = "joker-search-bar";
  searchBar.placeholder = "Search jokers...";
  searchBar.style.flex = "1 1 auto";
  searchBar.style.border = "none";
  searchBar.style.background = "#23272f";
  searchBar.style.color = "#ffe066";
  searchBar.style.fontSize = "1.1em";
  searchBar.style.padding = "10px 16px 10px 18px";
  searchBar.style.borderRadius = "8px";
  searchBar.style.boxShadow = "0 2px 8px rgba(0,0,0,0.10)";
  searchBar.style.outline = "none";
  searchBar.style.transition = "box-shadow 0.15s, border 0.15s";
  searchBar.style.width = "100%";
  searchBar.style.minWidth = "180px";
  searchBar.style.maxWidth = "220px";
  searchBar.style.zIndex = "2";
  searchBar.onfocus = () => {
    searchBar.style.boxShadow = "0 0 0 2px #ffe066";
  };
  searchBar.onblur = () => {
    searchBar.style.boxShadow = "0 2px 8px rgba(0,0,0,0.10)";
  };
  // --- Add Clear button next to search bar ---
  const searchRow = document.createElement('div');
  searchRow.style.display = 'flex';
  searchRow.style.flexDirection = 'row';
  searchRow.style.alignItems = 'center';
  searchRow.style.width = '100%';

  searchRow.appendChild(searchBar);

  const clearBtn = document.createElement('button');
  clearBtn.textContent = 'Clear';
  clearBtn.style.marginLeft = '10px';
  clearBtn.style.background = '#23272f';
  clearBtn.style.color = '#ffe066';
  clearBtn.style.border = '1.5px solid #ffe066';
  clearBtn.style.borderRadius = '8px';
  clearBtn.style.padding = '8px 16px';
  clearBtn.style.fontSize = '1em';
  clearBtn.style.cursor = 'pointer';
  clearBtn.style.fontWeight = 'bold';
  clearBtn.style.transition = 'background 0.15s, color 0.15s, border 0.15s';
  clearBtn.onmouseenter = () => { clearBtn.style.background = '#2d2f38'; };
  clearBtn.onmouseleave = () => { clearBtn.style.background = '#23272f'; };
  clearBtn.onclick = () => {
    searchBar.value = '';
    currentFilter = '';
    renderJokers(currentFilter, goldFilter);
    searchBar.focus();
  };
  searchRow.appendChild(clearBtn);

  searchContainer.appendChild(searchRow);

  // Gold filter toggle button (below search bar)
  const goldBtnContainer = document.createElement('div');
  goldBtnContainer.style.display = 'flex';
  goldBtnContainer.style.alignItems = 'center';
  goldBtnContainer.style.justifyContent = 'center';
  goldBtnContainer.style.marginTop = '16px';
  goldBtnContainer.style.width = '100%';

  const filterGold = document.createElement('button');
  filterGold.id = 'filter-gold';
  filterGold.className = 'filter-toggle';
  filterGold.textContent = 'Gold';
  filterGold.style.background = "#23272f";
  filterGold.style.color = "#ffe066";
  filterGold.style.border = "1.5px solid #ffe066";
  filterGold.style.borderRadius = "8px";
  filterGold.style.padding = "10px 18px";
  filterGold.style.fontSize = "1em";
  filterGold.style.cursor = "pointer";
  filterGold.style.fontWeight = "bold";
  filterGold.style.transition = "background 0.15s, color 0.15s, border 0.15s";
  filterGold.onmouseenter = () => { if (!filterGold.classList.contains('selected')) filterGold.style.background = "#2d2f38"; };
  filterGold.onmouseleave = () => { if (!filterGold.classList.contains('selected')) filterGold.style.background = "#23272f"; };
  goldBtnContainer.appendChild(filterGold);

  // --- Rarity filter buttons ---
  const rarityBtnContainer = document.createElement('div');
  rarityBtnContainer.style.display = 'flex';
  rarityBtnContainer.style.alignItems = 'center';
  rarityBtnContainer.style.justifyContent = 'center';
  rarityBtnContainer.style.marginTop = '8px';
  rarityBtnContainer.style.width = '100%';

  const rarityTypes = [
    { key: 'all', label: 'All', color: '#ffe066', bg: '#23272f' },
    { key: 'common', label: 'Common', color: '#00b4ff', bg: '#23272f' },
    { key: 'uncommon', label: 'Uncommon', color: '#50ff78', bg: '#23272f' },
    { key: 'rare', label: 'Rare', color: '#ff3c3c', bg: '#23272f' }
  ];
  let rarityFilter = 'all';
  const rarityBtns = {};
  rarityTypes.forEach(type => {
    const btn = document.createElement('button');
    btn.textContent = type.label;
    btn.style.background = type.bg;
    btn.style.color = type.color;
    btn.style.border = `1.5px solid ${type.color}`;
    btn.style.borderRadius = '8px';
    btn.style.padding = '8px 16px';
    btn.style.fontSize = '1em';
    btn.style.cursor = 'pointer';
    btn.style.fontWeight = 'bold';
    btn.style.margin = '0 6px';
    btn.style.transition = 'background 0.15s, color 0.15s, border 0.15s';
    btn.className = 'rarity-toggle';
    if (type.key === 'all') btn.classList.add('selected');
    btn.onclick = () => {
      rarityFilter = type.key;
      Object.values(rarityBtns).forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      renderJokers(currentFilter, goldFilter, rarityFilter);
    };
    rarityBtns[type.key] = btn;
    rarityBtnContainer.appendChild(btn);
  });
  searchContainer.appendChild(rarityBtnContainer);

  wrapper.appendChild(searchContainer);

  // State
  let currentFilter = '';
  let goldFilter = 'all';

  // Event listeners
  searchBar.addEventListener("input", (e) => {
    currentFilter = e.target.value;
    renderJokers(currentFilter, goldFilter, rarityFilter);
  });
  filterGold.addEventListener('click', () => {
    if (goldFilter === 'gold') {
      goldFilter = 'all';
      filterGold.classList.remove('selected');
    } else {
      goldFilter = 'gold';
      filterGold.classList.add('selected');
    }
    renderJokers(currentFilter, goldFilter, rarityFilter);
  });
}

// Save progress to a file
function saveProgress() {
  try {
    fs.writeFileSync(saveFilePath, JSON.stringify(jokers, null, 2), 'utf-8');
  } catch (e) {
    console.error('Failed to save progress:', e);
  }
}

// Load progress from a file
function loadProgress() {
  try {
    if (fs.existsSync(saveFilePath)) {
      const data = fs.readFileSync(saveFilePath, 'utf-8');
      const loaded = JSON.parse(data);
      // Only update gold status for matching jokers
      loaded.forEach(savedJoker => {
        const match = jokers.find(j => j.name === savedJoker.name);
        if (match) {
          match.gold = savedJoker.gold;
        }
      });
      console.log('Progress loaded:', loaded);
    }
  } catch (e) {
    console.error('Failed to load progress:', e);
  }
}

// Initial load
loadProgress();
renderJokers();
addSearchBar();