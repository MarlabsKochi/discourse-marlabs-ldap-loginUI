require 'omniauth'

module OmniAuth
  module Strategies
    class LDAP
      include OmniAuth::Strategy
      
      option :form_id, 'ldap-form'
      option :form_class, 'f-container'

      def request_phase
        OmniAuth::LDAP::Adaptor.validate @options
        f = Form.new(:url => callback_path)
        f.text_field 'Login', 'username'
        f.password_field 'Password', 'password'
        f.button "Sign In", "ldap-submit", "f-submit"
        f.to_response
      end
    end
  end
end

OmniAuth.config.add_camelization 'ldap', 'LDAP'