"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rejectNgoController = exports.acceptNgoController = void 0;
const ngoModel_1 = require("../../../framework/database/models/ngoModel");
const ngoRespository_1 = require("../../../framework/repository/ngoRespository");
const acceptNgo_1 = require("../../../app/usecases/ngo/accountVerify/acceptNgo");
const rejectNgo_1 = require("../../../app/usecases/ngo/accountVerify/rejectNgo");
const ngoRepository = (0, ngoRespository_1.ngoRepositroyEmpl)(ngoModel_1.ngoModel);
const acceptNgoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const rejectedNgo = yield (0, acceptNgo_1.acceptNgo)(ngoRepository)(id);
        if (rejectedNgo) {
            res.status(200).json({ message: "Account accepted" });
        }
        else {
            res.status(400).json({ message: "Error occured" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.acceptNgoController = acceptNgoController;
const rejectNgoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const rejectedNgo = yield (0, rejectNgo_1.rejectNgo)(ngoRepository)(id);
        if (rejectedNgo) {
            res.status(200).json({ message: "Account rejected" });
        }
        else {
            res.status(400).json({ message: "Error occured" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.rejectNgoController = rejectNgoController;
