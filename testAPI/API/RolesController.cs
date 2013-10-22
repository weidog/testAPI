using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace testAPI
{
    public class RolesController : ApiController
    {
        private static List<Role> RoleLists = new List<Role>
        {
            new Role { ID = 1, Name = "魏延", Pic = "Role/r1.jpg", Conversation = "丞相,下一步該怎麼作?" },
            new Role { ID = 2, Name = "諸葛亮", Pic = "Role/r2.jpg", Conversation = "............" },
            new Role { ID = 3, Name = "廖化", Pic = "Role/r3.jpg", Conversation = "幹!你智障嗎? 誰叫你打卡的??" },
            new Role { ID = 4, Name = "馬謖", Pic = "Role/r4.jpg", Conversation = "白癡!你自盡吧!!" }
            //,new Role { ID = 5, Name = "司馬懿", Pic = "Role/r5.jpg", Conversation = "讚!" }
        };

        private static List<RoleDetail> RoleDetailLists = new List<RoleDetail>
        {
            new RoleDetail { ID = 1, Info = "魏延（?－234年），字文長，荊州義陽郡（治今中國河南桐柏縣）人，三國時期蜀漢中後期重要將領，作戰英勇、屢立戰功、深得劉備信任。為人高傲自大，野心高，一直想爭取表現；曾向諸葛亮提出突襲長安之子午谷之計，但不被採納。"},
            new RoleDetail { ID = 2, Info = "諸葛亮（181年－234年），字孔明，徐州琅琊陽都（今山東省沂南縣）人，三國時期蜀漢丞相，中國歷史上著名的政治家、軍事家、散文家、發明家，也是中國傳統文化中，忠臣與智者的代表人物。諸葛亮在世時，擔任蜀漢丞相，封武鄉侯，辭世後追諡為忠武侯，因此亦受後世尊稱為武侯、諸葛武侯；早年則有號臥龍、伏龍。"},
            new RoleDetail { ID = 3, Info = "廖化（？－264年），本名廖淳，字元儉，荊州襄陽（今湖北省襄陽市）人，是三國時期蜀漢的將領。"},
            new RoleDetail { ID = 4, Info = "馬謖[1]（190年－228年），字幼常，荊州襄陽宜城（今湖北宜城）人。是蜀漢將領，也是侍中馬良之弟。初以荊州從事跟隨劉備取蜀入川，曾任綿竹、成都令、越嶲太守。"}
            //,new RoleDetail { ID = 5, Info = "司馬懿（179年－251年），字仲達，司州河內郡溫縣孝敬里舞陽村（今河南省溫縣招賢鎮）人，出身士族家庭，三國時期魏國大臣，政治家、軍事家。其子司馬昭稱王後，追尊為晉王；其孫司馬炎稱帝後，追尊為高祖宣皇帝，故也稱晉高祖、晉宣帝。"}
        };

        // GET api/<controller>
        public IEnumerable<Role> Get()
        {
            return RoleLists.OrderBy(x => x.ID);
        }

        // GET api/<controller>/5
        public RoleDetail Get(int id)
        {
            return RoleDetailLists.FirstOrDefault(x => x.ID == id);
        }

        // POST api/<controller>
        public int Post([FromBody]PostRole postRole)
        {
            postRole.Role.ID = RoleLists.Count > 0 ? RoleLists.Max(x => x.ID) + 1 : 1;
            postRole.RoleDetail.ID = RoleDetailLists.Count > 0 ? RoleDetailLists.Max(x => x.ID) + 1 : 1;
            RoleLists.Add(postRole.Role);
            RoleDetailLists.Add(postRole.RoleDetail);
            return postRole.Role.ID;
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]PostRole postRole)
        {
            Role _role = RoleLists.FirstOrDefault(x => x.ID == id);
            _role.Name = postRole.Role.Name;
            _role.Pic = postRole.Role.Pic;
            _role.Conversation = postRole.Role.Conversation;
            RoleDetail roleDetail = RoleDetailLists.FirstOrDefault(x => x.ID == id);
            roleDetail.Info = postRole.RoleDetail.Info;
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
            RoleLists.Remove(RoleLists.FirstOrDefault(x => x.ID == id));
            RoleDetailLists.Remove(RoleDetailLists.FirstOrDefault(x => x.ID == id));
        }
    }
}