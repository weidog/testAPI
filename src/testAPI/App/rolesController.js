//設定 controller
app.controller('rolesController', function ($scope, roleService) {
    //取得 Info sub function
    var getInfo = function (role) {
        //return promise
        return roleService.getRole(role).then(function (_role) {
            role.Info = _role.Info;
        });
    }
    //移除 role sub function
    var killRole = function (role) {
        angular.forEach($scope.roles, function (value, key) {
            if (value == role) {
                $scope.roles.splice(key, 1);
            }
        });
    };
    //所有 role (model)
    $scope.roles = [];
    //取得 roles
    roleService.getAllRoles().then(function (result) {
        $scope.roles = result;
    })
    //被點擊的 role (model)
    $scope.active = {};
    //li 的 click 事件
    $scope.showDetail = function (role) {
        //編輯中 不作用
        if (role.isEdit) return false;
        //取得 getInfo
        getInfo(role).then(function () {
            //將 role 設為 active
            $scope.active = role;
        });
    };
    //加入新 role
    $scope.newRole = function () {
        //push temp role 用以編輯
        $scope.roles.push({
            ID: -1,
            Name: '',
            Conversation: '',
            Pic: '',
            isEdit: true
        });
    };
    //切換編輯模式
    $scope.editRole = function (role) {
        //取得 getInfo
        getInfo(role).then(function () {
            //將 role 的內容 複製給 role.edit
            //因為在尚未儲存之前 不應與原本的 role 繫結
            role.edit = {
                ID: role.ID,
                Name: role.Name,
                Conversation: role.Conversation,
                Pic: role.Pic,
                Info: role.Info
            };
            //標示為編輯中
            role.isEdit = true;
            //清空 active 使下方 Info 區塊消失
            $scope.active = null;
        });
    };
    //取消編輯
    $scope.cancel = function (role) {
        role.isEdit = false;
        if (role.ID == -1) {
            //移除 temp role
            killRole(role);
        }
    };
    //移除 role
    $scope.remove = function (role) {
        //使用 roleService.deleteRole() promise
        roleService.deleteRole(role.ID).then(function () {
            killRole(role);
        });
    };
    //儲存
    $scope.save = function (role) {
        role.isEdit = false;
        //回傳及更新頁面所使用的 tmp 物件
        var _role = {
            ID: role.ID,
            Name: role.edit.Name,
            Pic: role.edit.Pic,
            Conversation: role.edit.Conversation
        };
        var _roleDetail = {
            ID: role.ID,
            Info: role.edit.Info,
        };
        //轉換成 JSON 字串
        var dataJSON = JSON.stringify({ role: _role, roleDetail: _roleDetail });
        //使用 roleService.saveRole() promise
        roleService.saveRole(role.ID, dataJSON).then(function (newID) {            
            if (newID) {
                //新增
                _role.ID = newID;
                _role.Info = _roleDetail.Info;
                $scope.roles.push(_role);
                killRole(role);
            } else {
                //修改
                angular.forEach($scope.roles, function (value, key) {
                    if (value.ID == role.ID) {
                        $scope.roles[key] = role.edit;
                    }
                });
            }
        });
    };
});