const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.rolesJob = (function(){
    ac.grant('applicant')
    .readAny("job")

    ac.grant("offerer")
    .readOwn("job")
    .createOwn("job")
    .updateOwn("job")
    .updateAny("job")
    .deleteOwn("job")
    .deleteAny("job")

    ac.grant("admin")
    .readAny("job")
    .updateAny("job")
    .deleteAny("job")

    return ac
})();