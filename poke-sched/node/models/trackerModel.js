const { ObjectId } = require('mongodb');

class Tracker {
  constructor(db) {
    this.collection = db.collection('tracker');
  }

  async findAll() {
    return await this.collection.find({}).toArray();
  }
  
  async findById(id) {
    return await this.collection.findOne({ _id: new ObjectId(id) });
  }

  async create(itemData) {
    const item = {
      name: itemData.item_name.toLowerCase(),
      photo: itemData.photo,
      amount: itemData.amount,
      amount: itemData.costPerItem,
      amount: itemData.cost,
      amount: itemData.marketPerItem,
      amount: itemData.market,
      amount: itemData.maxProfitPerItem,
      amount: itemData.maxPeofit,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await this.collection.insertOne(item);
    return { ...item, _id: result.insertedId };
  }

  async update(name, updates) {
    const updateDoc = {
      $set: {
        ...updates,
        updatedAt: new Date()
      }
    };

    const result = await this.collection.findOneAndUpdate(
      { name: name.toLowerCase() },
      updateDoc,
      { returnDocument: 'after' }
    );

    return result.value;
  }

  async delete(name) {
    const result = await this.collection.deleteOne({ name: name.toLowerCase() });
    return result.deletedCount > 0;
  }
}

module.exports = Coach;