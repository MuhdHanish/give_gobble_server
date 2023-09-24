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
exports.forgotNgoPassword = void 0;
const otpSendAndStore_1 = require("../../../../utils/otpSendAndStore");
const forgotNgoPassword = (ngoRepository) => (usernameOrEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const currentNgo = yield ngoRepository.findByUsernameOrEmail(usernameOrEmail);
    if (currentNgo && currentNgo.status) {
        const uId = yield (0, otpSendAndStore_1.otpSender)(currentNgo === null || currentNgo === void 0 ? void 0 : currentNgo.email, `Otp verification`);
        return uId;
    }
    return null;
});
exports.forgotNgoPassword = forgotNgoPassword;
