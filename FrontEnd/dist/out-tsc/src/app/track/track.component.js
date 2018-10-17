var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../api.service';
import { Order } from '../order/order.component';
import { ActivatedRoute } from '@angular/router';
var TrackComponent = /** @class */ (function () {
    function TrackComponent(formBuilder, api, route) {
        this.formBuilder = formBuilder;
        this.api = api;
        this.route = route;
        this.submitted = false;
        this.orderFound = false;
        this.order = new Order();
    }
    TrackComponent.prototype.ngOnInit = function () {
        var _this = this;
        var p = this.route.queryParams.subscribe(function (val) {
            console.log(val);
            if (val.hasOwnProperty("orderNumber")) {
                var outOrder = new Order();
                outOrder.orderNumber = val.orderNumber;
                outOrder.phone = val.phone;
                _this.api.getOrder(outOrder).subscribe(function (res) {
                    if (res != null) {
                        _this.orderFound = true;
                        _this.order = res;
                    }
                });
                return;
            }
        });
        this.trackerForm = this.formBuilder.group({
            ordernumber: ['', [Validators.required]],
            phone: ['555-555-5555', [Validators.required, Validators.pattern('^[0-9+-]+[0-9+-]+[0-9]$'), Validators.minLength(12), Validators.maxLength(12)]]
        }, { updateOn: 'blur' });
    };
    Object.defineProperty(TrackComponent.prototype, "f", {
        get: function () { return this.trackerForm.controls; },
        enumerable: true,
        configurable: true
    });
    TrackComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        this.trackerForm.controls.ordernumber.setErrors({ 'incorrect': false });
        this.trackerForm.controls.phone.setErrors({ 'incorrect': false });
        if (this.trackerForm.invalid) {
            return;
        }
        var outOrder = new Order();
        outOrder.orderNumber = this.trackerForm.value.ordernumber;
        outOrder.phone = this.trackerForm.value.phone;
        this.api.getOrder(outOrder).subscribe(function (res) {
            if (res != null) {
                _this.orderFound = true;
                _this.order = res;
            }
            else {
                _this.trackerForm.controls.ordernumber.setErrors({ 'incorrect': true });
                _this.trackerForm.controls.phone.setErrors({ 'incorrect': true });
            }
        });
    };
    TrackComponent = __decorate([
        Component({
            selector: 'app-track',
            templateUrl: './track.component.html',
            styleUrls: ['./track.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder, ApiService, ActivatedRoute])
    ], TrackComponent);
    return TrackComponent;
}());
export { TrackComponent };
//# sourceMappingURL=track.component.js.map