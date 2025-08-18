class TrackerController {
  constructor(trackerModel) {
    this.trackerModel = trackerModel;
  }

  async getAllItems(req, res) {
    try {
      const tracker = await this.trackerModel.findAll();
      
      if (!tracker || tracker.length === 0) {
        return res.status(404).json({ message: 'No items found' });
      }
      
      res.json(tracker);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

    async getById(req, res) {
    try {
      const tracker = await this.trackerModel.findById(req.body._id);
      
      res.json(tracker);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  async createItem(req, res) {
    try {
      const itemData = req.body;
      
      if (!itemData.photo || !itemData.item_name || !itemData.amount || !itemData.costPerItem || !itemData.cost || !itemData.marketPerItem || !itemData.market || !itemData.maxProfitPerItem || !itemData.maxPeofit) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
      
      const existingItem = await this.trackerModel.findByName(itemData.item_name);
      if (existingItem) {
        return res.status(400).json({ message: 'Item with this name already exists' });
      }
      
      const newItem = await this.trackerModel.create(itemData);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  async updateItem(req, res) {
    try {
      const { name } = req.params;
      const updates = req.body;
      
      const updatedItem = await this.trackerModel.update(name, updates);
      
      if (!updatedItem) {
        return res.status(404).json({ message: 'Item not found' });
      }
      
      res.json(updatedItem);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
  

  async deleteItem(req, res) {
    try {
      const { name } = req.params;
      const result = await this.trackerModel.delete(name);
      
      if (!result) {
        return res.status(404).json({ message: 'Item not found' });
      }
      
      res.json({ message: 'Item deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
}
module.exports = TrackerController;