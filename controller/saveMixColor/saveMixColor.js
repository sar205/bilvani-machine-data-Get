const Color =  require('../../mongodb/savedMixColor/saveMixeColor');

const saveMixColor = async (req, res) => {
    try {
        const { selectedColors, mixedColorHex } = req.body;

        const newColor = new Color({
            colors: selectedColors,
            mixedColorHex: mixedColorHex
        });
        await newColor.save();

        res.status(200).json({ message: 'Color data stored successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to store color data' });
    }
}

const getsaveColor = async (req, res) => {
    try {
      
        const allSavedColors = await Color.find();

       
        if (allSavedColors.length === 0) {
            return res.status(404).json({ message: 'No saved colors found' });
        }

        const savedColors = await Color.find({ fetched: false }).limit(1);

        if (savedColors.length === 0) {
            return res.status(200).json({ message: 'All data fetched, wait for new data entry' });
        }

    
        const colorIds = savedColors.map(color => color._id);
   
        await Color.updateMany({ _id: { $in: colorIds } }, { $set: { fetched: true } });


        const colorData = savedColors.map(color => ({
            selectedColors: color.colors.map(selectedColor => ({
                hex: selectedColor.hex,
                shade: selectedColor.shade,
                intensity: selectedColor.intensity
            })),
            mixedColorHex: color.mixedColorHex
        }));

        res.status(200).json({ message: 'Colors fetched successfully', colorData });
    } catch (error) {
        console.error('Error:', error.stack);
        res.status(500).json({ error: 'Failed to fetch saved colors' });
    }
};






module.exports = {saveMixColor, getsaveColor}
