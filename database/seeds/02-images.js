
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('images').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('images').insert([
        {image_url: 'https://db4sgowjqfwig.cloudfront.net/campaigns/90586/assets/1034901/alchemist.png?1578843255', description: 'test1', price: 16.7 },
        {image_url: 'https://www.myenglishpages.com/images/voc/reading/alchemist-1.jpg', description: 'test2', price: 16.7 },
        {image_url: 'https://pre15.deviantart.net/66f4/th/pre/i/2014/272/d/4/dwarven_alchemist_by_captdiablo-d7zweja.jpg', description: 'test3', price: 16.7 },
        {image_url: 'https://media.vanityfair.com/photos/5d1cc55b8d4436000984658c/master/pass/Alchemist-Fine-Dining-Lede.jpg', description: 'test4', price: 16.7 },
      ]);
    });
};
