var tz = new Intl.DateTimeFormat(undefined, {timeZone: "America/Indianapolis"}).resolvedOptions().timeZone;
var tz2 = newGlobal().eval(`
    new Intl.DateTimeFormat(undefined, {timeZone: "America/Indianapolis"}).resolvedOptions().timeZone;
`);
print(tz===tz2);
