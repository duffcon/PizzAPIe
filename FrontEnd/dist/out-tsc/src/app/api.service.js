var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var ApiService = /** @class */ (function () {
    function ApiService(http) {
        this.http = http;
        this.BASE_URL = "http://localhost:19864";
    }
    ApiService.prototype.getHomeMessage = function () {
        return this.http.get(this.BASE_URL + "/api/Home");
    };
    ApiService.prototype.getPizzaOptions = function () {
        return this.http.get(this.BASE_URL + "/api/Order/Options");
    };
    ApiService.prototype.sendOrder = function (order) {
        return this.http.post(this.BASE_URL + "/api/Order/New", order);
    };
    ApiService.prototype.getOrder = function (order) {
        return this.http.post(this.BASE_URL + "/api/Order/Order", order);
    };
    ApiService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], ApiService);
    return ApiService;
}());
export { ApiService };
//# sourceMappingURL=api.service.js.map