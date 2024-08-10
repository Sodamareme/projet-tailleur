import { trusted } from "mongoose";
import Recharge from "../models/recharge.js";
import User from "../models/user.js";
import { sendMail } from "../utils/utils.js";

const newRecharge = async (req, res) => {
    const { amount } = req.body;
    try {
        const code = await generateUniqueCode();

        const recharge = new Recharge({ user: req.userId, code, amount});

        await recharge.save();

        const user = await User.findById(req.userId);
        sendMail(user.email, 'Code de rechargement', 'Féliciation vous venez de faire un rechargement et voici votre code : ' + code);

        res.status(201).json({ message: 'Recharge code generated successfully', recharge, status: true });
    } catch (error) {
        res.status(500).json({ message: 'Error generating recharge code', error, status: false });
    }
};

const recharging = async (req, res) => {
    const { code } = req.body;
    const userId = req.userId;
    if(!code){
        return res.status(400).json({ message: 'Code de rechargement requis', status: false });
    }
    try{
        const recharge = await Recharge.findOne({ code });

        console.log(recharge);

        if (!recharge) {
            return res.status(404).json({ message: 'Ce code de rechargement n\'existe pas', status: false });
        }

        if(recharge.isUsed === true){
            return res.status(400).json({ message: 'Ce code de rechargement est déjà utilisé', status: false });
        }

        if(recharge.user.toString() !== userId){
            return res.status(403).json({ message: 'Ce code de rechargement ne vous appartient pas', status: false });
        }

        const user = await User.findById(userId);

        switch(recharge.amount){
            case 100:
                user.credit += 10;
                break;
            case 200:
                user.credit += 15;
                break;
            case 300:
                user.credit += 20;
                break;
            case 400:
                user.credit += 25;
                break;
            case 500:
                user.credit += 30;
                break;
            case 600:
                user.credit += 35;
                break;
            case 700:
                user.credit += 40;
                break;
            case 800:
                user.credit += 45;
                break;
            case 900:
                user.credit += 50;
                break;
            case 1000:
                user.credit += 55;
                break;
            default:
                // Add the amount to user points
                break;
        }

        await user.save();
        recharge.isUsed = true;
        await recharge.save();

        res.status(200).json({ message: 'Rechargement réussi', recharge, status: true });
    }catch (error) {
        res.status(500).json({ message: 'Error recharging', error, status: false });
    }
}


const generateUniqueCode = async () => {
    const generateCode = () => {
        return Math.floor(1000000000 + Math.random() * 9000000000);
    };

    let code;
    let isUnique = false;

    while (!isUnique) {
        code = generateCode();
        const existingRecharge = await Recharge.findOne({ code });

        if (!existingRecharge) {
            isUnique = true;
        }
    }

    return code;
};

export { newRecharge, recharging };