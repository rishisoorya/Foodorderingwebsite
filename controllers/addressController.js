import { Address } from "../models/addressModel.js";
import { User } from "../models/userModel.js";

export async function generateAddress(req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const {
      recipientName,
      buildingName,
      streetAddress,
      nearbyLandmark,
      cityName,
      stateName,
      postalCode,
      contactNumber,
    } = req.body;

    if (
      !recipientName ||
      !buildingName ||
      !streetAddress ||
      !nearbyLandmark ||
      !cityName ||
      !stateName ||
      !postalCode ||
      !contactNumber
    ) {
      return res.status(400).json({ message: "Every field is required" });
    }

    const newAddress = new Address({
      recipientName,
      buildingName,
      streetAddress,
      nearbyLandmark,
      cityName,
      stateName,
      postalCode,
      contactNumber,
      userReferenceId: req.user.id,
    });

    await newAddress.save();

    res
      .status(201)
      .json({ message: "Address successfully created", newAddress });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function removeAddress(req, res) {
  try {
    const { addressId } = req.params;
    const userReferenceId = req.user.id;
    const user = await User.findById(userReferenceId);

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const removedAddress = await Address.findByIdAndDelete(addressId);

    if (!removedAddress) {
      return res
        .status(404)
        .json({ message: "Address not found or already deleted" });
    }

    return res
      .status(200)
      .json({ message: "Address cleared successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getAllAddress(req,res) {

  try {
    const userid = req.user.id
    const {addressId} = req.params
    const address = await Address.find({userid})
    if (address.length === 0){
      return res.status(400).json({message:"No Address created"});
    }
    res.status(201).json({message:""})
    
  } catch (error) {
    
  }
  
}