import { collection, addDoc, doc, setDoc } from "firebase/firestore"; 
import { getDb } from "../config/db.js";
const db = getDb();

class TrackerController {
    constructor (image, name, totalCost, mPPI, totalMP, maxPPRI, maxMPP) {
        this.image = image;
        this.name = name;
        this.totalCost = totalCost;
        this.mPPI = mPPI;
        this.totalMP = totalMP;
        this.maxPPRI = maxPPRI;
        this.maxMPP = maxMPP;
    }
    toString() {
        return this.name + ', ' + this.state + ', ' + this.country;
    }
}

// Firestore data converter
const trackerConverter = {
    toFirestore: (tracker) => {
        return {
            image: tracker.image,
            name: tracker.name,
            totalCost: tracker.totalCost,
            mPPI: tracker.mPPI,
            totalMP: tracker.totalMP,
            maxPPRI: tracker.maxPPRI,
            maxMPP: tracker.maxMPP
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new TrackerController(data.image, data.name, data.totalCost, data.MPPI, data.totalMP, data.maxPPRI, data.maxMPP);
    }
};

export const getAllItems = async (req, res) => {
    const ref = collection(db, "trackers").withConverter(trackerConverter);
    const snapshot = await getDocs(ref);
    const trackers = [];
    snapshot.forEach(doc => {
        trackers.push(doc.data());
    });
    res.status(200).json(trackers);
}

export const getById = async (req, res) => {
    const id = req.params.id;
    const ref = doc(db, "trackers", id).withConverter(trackerConverter);
    const snapshot = await getDoc(ref);
    if (!snapshot.exists()) {
        res.status(404).json({ error: 'Item not found' });
        return;
    }
    res.status(200).json(snapshot.data());
}

export const getByName = async (req, res) => {
    const name = req.params.name;
    const ref = collection(db, "trackers").withConverter(trackerConverter);
    const q = query(ref, where("name", "==", name));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
        res.status(404).json({ error: 'Item not found' });
        return;
    }
    const trackers = [];
    snapshot.forEach(doc => {
        trackers.push(doc.data());
    });
    res.status(200).json(trackers);
}

export const createItem = async (req, res) => {
    const data = req.body;
    if (!data.name) {
        res.status(400).json({ error: 'Name is required' });
        return;
    }
    const tracker = new TrackerController(data.image, data.name, data.totalCost, data.mPPI, data.totalMP, data.maxPPRI, data.maxMPP);
    try {
        const ref = collection(db, "trackers").withConverter(trackerConverter);
        const docRef = await addDoc(ref, tracker);
        res.status(201).json({ id: docRef.id });
    } catch (error) {
        res.status(500).json({ error: 'Error creating item' });
    }
}

export const updateItem = async (req, res) => {
    const name = req.params.name;
    const data = req.body;
    if (!data.name) {
        res.status(400).json({ error: 'Name is required' });
        return;
    }
    const ref = collection(db, "trackers").withConverter(trackerConverter);
    const q = query(ref, where("name", "==", name));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
        res.status(404).json({ error: 'Item not found' });
        return;
    }
    const docRef = snapshot.docs[0].ref;
    const tracker = new TrackerController(data.image, data.name, data.totalCost, data.mPPI, data.totalMP, data.maxPPRI, data.maxMPP);
    try {
        await setDoc(docRef, tracker);
        res.status(200).json({ message: 'Item updated' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating item' });
    }
}

export const deleteItem = async (req, res) => {
    const name = req.params.name;
    const ref = collection(db, "trackers").withConverter(trackerConverter);
    const q = query(ref, where("name", "==", name));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
        res.status(404).json({ error: 'Item not found' });
        return;
    }
    const docRef = snapshot.docs[0].ref;
    try {
        await deleteDoc(docRef);
        res.status(200).json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting item' });
    }
}

export default TrackerController;