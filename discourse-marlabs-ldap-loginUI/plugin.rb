
register_asset 'javascripts/login-ui.js'

after_initialize do
  require_dependency File.expand_path('../lib/omniauth/stratergies/ldap.rb', __FILE__)
end
