//設定 service
app.service('roleService', function ($http, $q) {
    var myService = {
        getAllRoles: function () {
            //使用 $q.defer() 產生 deferred 實體
            var deferred = $q.defer();
            //非同步 get 回傳 promise
            $http.get('api/Roles/').success(function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        },
        getRole: function (role) {
            //使用 $q.defer() 產生 deferred 實體
            var deferred = $q.defer();
            //確保 Info 有資料 只會查詢第一次
            if (!role.Info) {
                //非同步 get 回傳 promise
                $http.get('api/Roles/' + role.ID).success(function (data) {
                    deferred.resolve(data);
                });
            } else {
                //原資料返回
                deferred.resolve(role);
            }
            return deferred.promise;
        },
        deleteRole: function (id) {
            //使用 $q.defer() 產生 deferred 實體
            var deferred = $q.defer();
            //$http.get() 會回傳 promise
            $http.delete('api/Roles/' + id).success(function () {
                deferred.resolve();
            });
            return deferred.promise;
        },
        saveRole: function (id, dataJSON) {
            //使用 $q.defer() 產生 deferred 實體
            var deferred = $q.defer();
            //判斷 新增/修改
            if (id == -1) {
                //非同步 post 回傳 promise
                $http.post('api/Roles/', dataJSON).success(function (_id) {
                    deferred.resolve(_id);
                });
            } else {
                //非同步 put 回傳 promise
                $http.put('api/Roles/' + id, dataJSON).success(function () {
                    deferred.resolve();
                });
            }
            return deferred.promise;
        }
    };
    return myService;
});