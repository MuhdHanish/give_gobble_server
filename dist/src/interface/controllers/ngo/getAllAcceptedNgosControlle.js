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
const getAllAcceptedNgos_1 = require("../../../app/usecases/ngo/getAllAcceptedNgos");
const ngoRespository = (0, ngoRespository_1.ngoRepositroyEmpl)(ngoModel_1.ngoModel);
const getAllAcceptedNgosController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const ngos = yield (0, getAllAcceptedNgos_1.getAllAcceptedNgos)(ngoRespository)((_a = req.userInfo) === null || _a === void 0 ? void 0 : _a.id);
        return res.status(201).json({ message: "Fetched ngos sucessfully", ngos });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = getAllAcceptedNgosController;
