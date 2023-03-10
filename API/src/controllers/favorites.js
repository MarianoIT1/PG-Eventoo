const { 
  Event, 
  User, 
  Address, 
  Category, 
  BankAccount } 
  = require("../db");


const addFavorite = async (req, res) => {

  const { id } = req.body;
  const userId  = req.userId;

try {
  const user = await User.findByPk(userId);
  const event = await Event.findByPk(id, {
    where:{ isPublic: true },
  });


  const existingEvent = await User.findOne({
    where: { id: userId },
    include: [{
      model: Event,
      as: "favorites",
      where: { id: id,
              isPublic: true
            },
    }]
    });

  if (existingEvent){
    return res.status(400).json({msg: "event already exists in favorites list"});
  } 

  await user.addFavorites(event);
  const favorites = await user.getFavorites()

  return res.status(200).json(favorites.map(f => f.id));

} catch (error) {
  res.status(500).json({ msg: error.message })
}
};


const getFavorites = async (req, res) => {
  const userId  = req.userId;
  try {
   const user = await User.findByPk(userId)
   const favorites = await user.getFavorites()
   
   return res.json( favorites.map(f => f.id) );
  
  } catch (error) {
      res.status(500).json({ msg: error.message });
   }
};
 

const deleteFavorite = async (req, res) => {

  try {
   const { id } = req.body;
   const userId  = req.userId;

   const user = await User.findByPk(userId);
   const event = await Event.findByPk(id);

   await user.removeFavorites(event);

   const favorites = await user.getFavorites()

   return res.status(200).json(favorites.map(f => f.id));
 } catch (error) {
   res.status(500).json({ msg: error.message })
 }
};

module.exports = { 
 addFavorite,
 getFavorites,
 deleteFavorite 
};