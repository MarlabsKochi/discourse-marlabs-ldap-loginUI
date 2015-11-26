register_asset 'javascripts/jquery-ui.min.js'
register_asset 'javascripts/simple.js'
register_asset 'stylesheets/jquery-ui.min.css'
register_asset 'stylesheets/style.css'

after_initialize do
  require_dependency File.expand_path('../lib/omniauth/stratergies/ldap.rb', __FILE__)
  require_dependency File.expand_path('../lib/omniauth/form.rb', __FILE__)
end
