import React from "react";
const Cart = () => (
  <section class="section-content padding-y">
    <div class="container">

      <div class="row">
        <main class="col-md-9">
          <div class="card">

            <table class="table table-borderless table-shopping-cart">
              <thead class="text-muted">
                <tr class="small text-uppercase">
                  <th scope="col">Sản phẩm</th>
                  <th scope="col" width="120">Số lượng</th>
                  <th scope="col" width="120">Giá tiền</th>
                  <th scope="col" class="text-right" width="200"> </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <figure class="itemside">
                      <div class="aside"><img src={require("../../assets/images/items/1.jpg")} alt="" class="img-sm" /></div>
                      <figcaption class="info">
                        <a href="#" class="title text-dark">Vòng cổ</a>
                        <p class="text-muted small">Size: XL, Color: blue, <br /> Thương hiệu: Gucci</p>
                      </figcaption>
                    </figure>
                  </td>
                  <td>
                    <select class="form-control">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                    </select>
                  </td>
                  <td>
                    <div class="price-wrap">
                      <var class="price"> 1.199.000VNĐ</var>
                      <small class="text-muted"> </small>
                    </div>
                  </td>
                  <td class="text-right">
                    <a data-original-title="Save to Wishlist" title="" href="" class="btn btn-light" data-toggle="tooltip"> <i class="fa fa-heart"></i></a>
                    <a href="login" class="btn btn-light"> Đặt hàng</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <figure class="itemside">
                      <div class="aside"><img src={require("../../assets/images/items/2.jpg")} alt="" class="img-sm" /></div>
                      <figcaption class="info">
                        <a href="#" class="title text-dark">Vòng cổ</a>
                        <p class="text-muted small">Size: XL, Color: blue, <br /> Brand: LUIVUITOI</p>
                      </figcaption>
                    </figure>
                  </td>
                  <td>
                    <select class="form-control">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                    </select>
                  </td>
                  <td>
                    <div class="price-wrap"><var class="price"> 3999000VNĐ</var>
                      <small class="text-muted"> </small>
                    </div>
                  </td>
                  <td class="text-right">
                    <a data-original-title="Save to Wishlist" title="" href="" class="btn btn-light" data-toggle="tooltip"> <i class="fa fa-heart"></i></a>
                    <a href="login" class="btn btn-light btn-round"> Đặt hàng</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <figure class="itemside">
                      <div class="aside"><img src={require("../../assets/images/items/4.jpg")} alt="" class="img-sm" /></div>
                      <figcaption class="info">
                        <a href="#" class="title text-dark"> Lách tay </a>
                        <p class="small text-muted">Size: XL, Color: blue,  Brand: ODAYTE</p>
                      </figcaption>
                    </figure>
                  </td>
                  <td>
                    <select class="form-control">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </select>
                  </td>
                  <td>
                    <div class="price-wrap">
                      <var class="price">999000VNĐ</var>
                      <small class="text-muted"> </small>
                    </div>
                  </td>
                  <td class="text-right">
                    <a data-original-title="Save to Wishlist" title="" href="" class="btn btn-light" data-toggle="tooltip"> <i class="fa fa-heart"></i></a>
                    <a href="login" class="btn btn-light btn-round"> Đặt hàng</a>
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="card-body border-top">
              <a href="login" class="btn btn-primary float-md-right"> Đặt hàng ngay... <i class="fa fa-chevron-right"></i> </a>
              <a href="#" class="btn btn-light"> <i class="fa fa-chevron-left"></i> Mua ngay </a>
            </div>
          </div>

          <div class="alert alert-success mt-3">
            <p class="icontext"><i class="icon text-success fa fa-truck"></i> Thời gian giao hàng 1-2 ngày</p>
          </div>

        </main>
        <aside class="col-md-3">
          <div class="card mb-3">
            <div class="card-body">
              <form>
                <div class="form-group">
                  <label>Phiếu giảm giá</label>
                  <div class="input-group">
                    <input type="text" class="form-control" name="" placeholder="Thẻ ATM" />
                    <span class="input-group-append">
                      <button class="btn btn-primary">Áp dụng</button>
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div><div class="card">
            <div class="card-body">
              <dl class="dlist-align">
                <dt>Tổng giá:</dt>
                <dd class="text-right">999000 VNĐ</dd>
              </dl>
              <dl class="dlist-align">
                <dt>Giảm giá:</dt>
                <dd class="text-right">99000 VNĐ</dd>
              </dl>
              <dl class="dlist-align">
                <dt>Tổng cộng:</dt>
                <dd class="text-right  h5"><strong> 900000 VNĐ</strong></dd>
              </dl>
              <hr />
              <p class="text-center mb-3">
                <img src={require("../../assets/images/misc/payments.png")} alt="" height="26" />
              </p>

            </div>
          </div>
        </aside>
      </div>

    </div>
  </section>
)
export default Cart