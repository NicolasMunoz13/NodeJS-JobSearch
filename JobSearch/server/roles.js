const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function(){
    ac.grant('applicant')
    .readOwn("profile")
    .updateOwn("profile");

    ac.grant("offerer")
    .extend("applicant")
    .readAny("profile");

    ac.grant("admin")
    .extend("applicant")
    .extend("offerer")
    .updateAny("profile")
    .deleteAny("profile")

    return ac;
})();

