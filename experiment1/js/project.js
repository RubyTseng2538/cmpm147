const fillers = {
  pre1:["Mystic", "Celestial", "Arcane", "Ethereal", "Nature's", "Bewitching", "Serene", "Enchanted"],
  pre2:["Mystic", "Celestial", "Arcane", "Ethereal", "Nature's", "Bewitching", "Serene", "Enchanted"],
  post:["Elixir", "Aura", "Essence", "Dream", "Enchantment", "Bloom", "Harmony", "Magic", "Fragrance", "Mist", "Potion"],
  adjective:["floral", "spicy", "woody", "citrusy", "fresh", "aromatic", "fruity", "sweet", "powdery", "exotic", "seductive", "sensual", "elegant", "romantic", "bold", "euphoric", "hypnotic", "bewitching", "captivating", "dreamy", "mesmerizing", "alluring"],
  adjective2:["floral", "spicy", "woody", "citrusy", "fresh", "aromatic", "fruity", "sweet", "powdery", "exotic", "seductive", "sensual", "elegant", "romantic", "bold", "euphoric", "hypnotic", "bewitching", "captivating", "dreamy", "mesmerizing", "alluring"],
  adjective3:["floral", "spicy", "woody", "citrusy", "fresh", "aromatic", "fruity", "sweet", "powdery", "exotic", "seductive", "sensual", "elegant", "romantic", "bold", "euphoric", "hypnotic", "bewitching", "captivating", "dreamy", "mesmerizing", "alluring"],
  adjective4:["floral", "spicy", "woody", "citrusy", "fresh", "aromatic", "fruity", "sweet", "powdery", "exotic", "seductive", "sensual", "elegant", "romantic", "bold", "euphoric", "hypnotic", "bewitching", "captivating", "dreamy", "mesmerizing", "alluring"],
  adjective5:["floral", "spicy", "woody", "citrusy", "fresh", "aromatic", "fruity", "sweet", "powdery", "exotic", "seductive", "sensual", "elegant", "romantic", "bold", "euphoric", "hypnotic", "bewitching", "captivating", "dreamy", "mesmerizing", "alluring"],
  noun:["Alchemy", "Apothecary", "Aromas", "Scentcraft", "Perfumery", "Parfums", "Scents", "Fragrances"],
  location:["Aetheria", "Elvenwood", "Dwarvenhold", "Merfolk Dominion", "Feywild Realm", "Dragonscale Empire", "Nomadic Tribes of the Sandsea", "Sylvan Grove", "Shadowlands", "Celestia"],
  scent1:["Starlight Blossom", "Moonvine", "Dragonleaf", "Faerie Fern", "Unicorn Lily", "Phoenix Ember", "Mermaid Seaweed", "Elfwood Moss", "Pixie Petal", "Nymph Nectar", "Darkwood Bark", "Serpent Vine", "Griffin Grass"],
  scent2:["Starlight Blossom", "Moonvine", "Dragonleaf", "Faerie Fern", "Unicorn Lily", "Phoenix Ember", "Mermaid Seaweed", "Elfwood Moss", "Pixie Petal", "Nymph Nectar", "Darkwood Bark", "Serpent Vine", "Griffin Grass"],
  scent3:["Starlight Blossom", "Moonvine", "Dragonleaf", "Faerie Fern", "Unicorn Lily", "Phoenix Ember", "Mermaid Seaweed", "Elfwood Moss", "Pixie Petal", "Nymph Nectar", "Darkwood Bark", "Serpent Vine", "Griffin Grass"]
  };
  
  const template = `Perfume Name: $pre1 $post
  \nPerfumer/Brand: $pre2 $noun
  \nDescription: This is a $adjective $adjective2 fragrance inspired by $location. Crafted from $adjective3 $scent1, this perfume blends seamlessly with $adjective4 $scent2 and $adjective5 $scent3, culminating in a scent that captures the essence of $location. 
  \nKey Notes: $scent1, $scent2, and $scent3
  `;
  
  // STUDENTS: You don't need to edit code below this line.
  
  const slotPattern = /\$(\w+)/;
  
  function replacer(match, name) {
    let options = fillers[name];
    if (options) {
      return options[Math.floor(Math.random() * options.length)];
    } else {
      return `<UNKNOWN:${name}>`;
    }
  }
  
  function generate() {
    let story = template;
    let usedFillers = {};
    let usedScents = {}; // Keep track of used scents
    while (story.match(slotPattern)) {
      story = story.replace(slotPattern, (match, name) => {
        if (name.startsWith('scent')) {
          // If scent for this slot has not been used yet, pick one and mark it as used
          if (!usedScents[name]) {
            let options = fillers[name];
            if (options) {
              let selectedOption;
              do {
                selectedOption = options[Math.floor(Math.random() * options.length)];
              } while (Object.values(usedScents).includes(selectedOption)); // Ensure selected scent is different from previously used scents
              usedScents[name] = selectedOption;
              return selectedOption;
            }
          }
          // If scent has been used, stick to the same one
          return usedScents[name];
        } else {
          // For other fillers, use the existing logic
          if (!usedFillers[name]) {
            let options = fillers[name];
            if (options) {
              let selectedOption = options[Math.floor(Math.random() * options.length)];
              usedFillers[name] = selectedOption;
              return selectedOption;
            }
          }
          return usedFillers[name];
        }
      });
    }
  
    /* global box */
    $("#box").text(story);
  }
  
  /* global clicker */
  $("#clicker").click(generate);
  
  generate();