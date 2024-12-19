import { adminservices } from "../services/adminservices.js";
import { api } from "../model/api.js";

const renderTable = (arr) => {
  // xuất ra bảng ngoài UI
  let htmlContent = "";
  arr.forEach((item, index) => {
    htmlContent += `
      <tr>
      <td>${index + 1}</td>
      <td>${item.tenSP}</td>
      <td>${item.giaSP}</td>
      <td>${item.screenSP}</td>
      <td>${item.backcameraSP}</td>
      <td>${item.frontcameraSP}</td>
      <td><img width="100" height="100" src="${item.imgSP}"/></td>
      <td>${item.descSP}</td>
      <td>${item.typeSP}</td>
      <td>
                    <button
                        class=" btn px-4 py-2 bg-green-500"
                        onclick="editProduct('${item.id}')"
                    >
                        Edit
                    </button>
                    <button 
                    class="btndelete px-4 py-2 bg-green-500"
                    onclick="deleteProduct('${item.id}')"
                      >Delete 
                      </button>
                </td>
      
      </tr>
    `;
  });
  document.getElementById("tblDanhSachSP").innerHTML = htmlContent;
};

const getProducts = async () => {
  // lay du lieu tu api
  try {
    const kq = await api.getProductList();

    console.log("kq: ", kq.data);
    renderTable(kq.data);
  } catch (error) {
    console.log("error: ", error);
  }
};
getProducts();

const layThongTinSanPham = () => {
  //lấy thông tin sản phẩm
  const elements = Array.from(
    document.querySelectorAll("#formSP input,#formSP select")
  );

  let sp = {}; // Khởi tạo đối tượng rỗng

  elements.forEach((ele) => {
    sp[ele.id] = ele.value; // Gán key là ele.id và value là ele.value
  });
  // let sp = elements.reduce((acc, ele) => {
  //   acc[ele.id] = ele.value;
  //   return acc;
  // }, {});

  return new adminservices(
    sp.tenSP,
    sp.giaSP,
    sp.screenSP,
    sp.backcameraSP,
    sp.frontcameraSP,
    sp.imgSP,
    sp.descSP,
    sp.typeSP
  );
};

document.getElementById("formSP").onsubmit = async (ev) => {
  //xử lý sự kiện khi click vào  button form
  ev.preventDefault();
  //xuất thông tin sản phẩm ra cửa sổ consolog
  const sp = layThongTinSanPham();
  console.log("sp: ", sp);
  await api.addProduct(sp);

  getProducts();
};

window.editProduct = async (productId) => {
  //chỉnh sửa sản phẩm
  console.log("productId: ", productId);

  try {
    // tạo biến điệm khi gọi api sang
    const result = await api.getProductById(productId);
    console.log("result: ", result.data);
    //lấy lai form input  và select khi nhấp edit sản phẩm
    const eles = document.querySelectorAll("#formSP input,#formSP select");
    console.log("eles: ", eles);
    //
    eles.forEach((ele) => {
      const { id } = ele;
      ele.value = result.data[id];
    });

    // hiển modal ở khi mở form edit
    const modal = document.getElementById("exampleModal");
    modal.classList.remove("hidden");
  } catch (error) {
    console.log("error: ", error);
  }
};

window.deleteProduct = async (productId) => {
  //xóa sản phần
  //console.log("deleteProduct: ", deleteProduct);
  try {
    await api.deleteProduct(productId);
    getProducts();
  } catch (error) {
    console.log("error: ", error);
  }
};
