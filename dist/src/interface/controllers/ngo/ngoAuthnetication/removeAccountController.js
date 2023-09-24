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
const ngoModel_1 = require("../../../../framework/database/models/ngoModel");
const ngoRespository_1 = require("../../../../framework/repository/ngoRespository");
const removeNgoAccount_1 = require("../../../../app/usecases/ngo/ngoAuthentication/removeNgoAccount");
const ngoRepository = (0, ngoRespository_1.ngoRepositroyEmpl)(ngoModel_1.ngoModel);
const removeAccountController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const removedAccount = yield (0, removeNgoAccount_1.removeNgoAccount)(ngoRepository)(id);
        if (removedAccount) {
            res.status(200).json({ message: "Account removed" });
        }
        else {
            res.status(400).json({ message: "Error occured" });
        }
    }
    catch (error) {
    }
});
exports.default = removeAccountController;
