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
const ngoModel_1 = require("../../../framework/database/models/ngoModel");
const ngoRespository_1 = require("../../../framework/repository/ngoRespository");
const getNgoRequest_1 = require("../../../app/usecases/ngo/accountVerify/getNgoRequest");
const ngoRepository = (0, ngoRespository_1.ngoRepositroyEmpl)(ngoModel_1.ngoModel);
const getRequestedNgosController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestedNgos = yield (0, getNgoRequest_1.getRequestedNgos)(ngoRepository)();
        if (requestedNgos) {
            res.status(200).json({ message: "Requsted Ngos fetched successfully", requestedNgos });
        }
        else {
            res.status(400).json({ message: "Error occured" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = getRequestedNgosController;
