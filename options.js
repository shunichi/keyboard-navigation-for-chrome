function restore(){
   FunctionManager.restore();
   HitaHintManager.restore();
   SiteManager.restore();
}

// for key config
var FunctionManager = {
   save: function(){
      localStorage["search"] = search.checked;
      localStorage["hitahint"] = hitahint.checked;
      localStorage["other"] = other.checked;
   },
   restore: function(){
      if (!localStorage["search"])
         localStorage["search"] = true;
      if (!localStorage["hitahint"])
         localStorage["hitahint"] = true;
      if (!localStorage["other"])
         localStorage["other"] = true;

      search.checked   = localStorage["search"]   =="true"?true:false;
      hitahint.checked = localStorage["hitahint"] =="true"?true:false;
      other.checked    = localStorage["other"]    =="true"?true:false;
   },
};

// for hit a hint
var HitaHintManager = {
   save: function(){
      if (hitahintkeys.value)
         localStorage["hitahintkeys"] = hitahintkeys.value;
   },
   restore: function(){
      if (!localStorage["hitahintkeys"])
         localStorage["hitahintkeys"] = "asdfjkl";
      hitahintkeys.value = localStorage["hitahintkeys"];
   },
};

// for disabled sites
var SiteManager = {
   save: function(){
      var sites = "";
      for (var i=0 ; i < disabled_sites.length ; i++)
         sites += disabled_sites[i].value+",";
      localStorage["disabled_sites"] = sites;
   },
   restore: function(){
      var data = localStorage["disabled_sites"];
      if (!data)
         return;
      var sites = data.split(",").slice(0,-1);
      for (var i=0 ; i < sites.length ; i++)
         this._append(sites[i]);
   },
   add: function(){
      if (disabled_sites_adder.value == "")
         return;
      this._append(disabled_sites_adder.value);
   },
   del: function(){
      for (var i=0; i < disabled_sites.length ; i++)
         if (disabled_sites[i].selected)
            disabled_sites.removeChild(disabled_sites[i--]);
   },
   _append: function(site){
      var option = document.createElement("option");
      option.innerText = site;
      option.value = site;
      disabled_sites.appendChild(option);
   },
};

document.addEventListener("DOMContentLoaded", () => {
  ['search', 'hitahint', 'other'].forEach((id) => {
    const elem = document.getElementById(id);
    elem.addEventListener('click', () => FunctionManager.save());
  });
  document.getElementById('hitahintkeys').addEventListener('keyup', () => HitaHintManager.save())
  document.getElementById('site-add').addEventListener('click', () => SiteManager.add());
  document.getElementById('site-del').addEventListener('click', () => SiteManager.del());
  document.getElementById('site-save').addEventListener('click', () => SiteManager.save());
  restore();
});
