$(function () {
  $.ajax({
    url: "http://localhost:3000/users",
  }).done(function (users) {
    let htmlString = "";

    // Dùng vòng lặp for i
    // for (let i = 0; i < users.length; i++) {
    //   htmlString += `<tr>
    //     <td>${users[i].name}</td>
    //     <td>${users[i].birthday}</td>
    //     <td>wtribe0@kickstarter.com</td>
    //     <td>867-130-6017</td>
    //     <td>
    //       <a href="/edit.html?id=1" class="text-info"
    //         ><i class="fa fa-edit"></i> Chỉnh sửa</a
    //       >
    //       |
    //       <a href="javascript:void(0)" class="text-danger"
    //         ><i class="fa fa-trash-alt"></i> Xóa</a
    //       >
    //     </td>
    //   </tr>`;
    // }

    // Dùng vòng lặp for of
    for (let user of users) {
      htmlString += `<tr>
          <td>${user.name}</td>
          <td>${user.birthday}</td>
          <td>${user.email}</td>
          <td>${user.phone}</td>
          <td>
            <a href="/edit.html?id=1" class="text-info"
              ><i class="fa fa-edit"></i> Chỉnh sửa</a
            >
            |
            <a href="javascript:void(0)" class="text-danger"
              onclick="deleteUser()"><i class="fa fa-trash-alt"></i> Xóa</a
            >
          </td>
        </tr>`;
    }

    // Thay đổi nội dung HTML của thẻ tbody thành chuỗi htmlString ở trên
    $("#table-users").html(htmlString);
  });
});
const API_ROOT = 'http://localhost:3000/users';

function getUsersAPI(renderFunction) {
  $.ajax({
      method: 'GET',
      url: API_ROOT,
  }).done(function (users) {
      if (renderFunction) renderFunction(users)
  })
}

function getUserByIdAPI(id, renderFunction) {
  $.ajax({
      method: 'GET',
      url: API_ROOT + '/' + id,
  }).done(function (user) {
      renderFunction(user)
  }).catch(function () {
      renderFunction(null)
  })
}

function createUserAPI(user, redirectLink) {
  $.ajax({
      method: 'POST',
      url: API_ROOT,
      data: user
  }).done(function () {
      if (redirectLink) window.location.href = redirectLink
  })
}

function updateUserAPI(userId, userInfo, redirectLink) {
  $.ajax({
      method: 'PUT',
      url: API_ROOT + '/' + userId,
      data: userInfo
  }).done(function () {
      if (redirectLink) window.location.href = redirectLink
  })
}

function deleteUserAPI(id, renderFunction) {
  $.ajax({
      method: 'DELETE',
      url: API_ROOT + '/' + id
  }).done(function () {
      if (renderFunction) renderFunction()
  })
}

function getFormAPI(renderFunction) {
  $.ajax({
      method: 'GET',
      url: '/form.html',
  }).done(function (html) {
      if (renderFunction) renderFunction(html)
  })
}
$(function () {
  getUsersAPI(renderContent);
})
function renderContent(users) {
  let htmlContent = '';

  for (let i = 0; i < users.length; i++) {
      htmlContent += '<tr>';
      htmlContent += '<td>' + users[i].name + '</td>';
      htmlContent += '<td>' + (users[i].birthday || 'Chưa biết') + '</td>';
      htmlContent += '<td>' + users[i].email + '</td>';
      htmlContent += '<td>' + users[i].phone + '</td>';
      htmlContent += '<td>' +
          '<a href="/edit.html?id=' + users[i].id + '" class="text-info"><i class="fa fa-edit"></i> Chỉnh sửa</a> | ' +
          '<a href="javascript:void(0)" class="text-danger" onclick="deleteUser(' + users[i].id + ', this)"><i class="fa fa-trash-alt"></i> Xóa</a>' +
          '</td>';
      htmlContent += '</tr>';
  }

  $('table tbody').html(htmlContent);
}

function deleteUser(id, aElement) {
  const result = confirm('Bạn có chắc chắn muốn xóa học viên này?');
  if (result) {
      deleteUserAPI(id, function () {
          const tdElement = $(aElement).parent();
          const trElement = tdElement.parent();
          trElement.remove();
      })
  }
}
function newUser(user) {
  $.ajax({
      method: 'POST',
      url: API_ROOT,
      data: {
        name:$("#name").val(),
        birthday:$("#birthday").val(),
        email:$("#email").val(),
        phone:$("#phone").val(),
      }
  }).done(function () {
       
        console.log(12345);
        window.location.href = "/";
  })
}