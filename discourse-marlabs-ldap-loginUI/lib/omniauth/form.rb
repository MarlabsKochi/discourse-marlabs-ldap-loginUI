module OmniAuth
  class Form 
    attr_accessor :options

    def initialize(options = {})
      options[:form_id] ||= 'ldap-form'
      options[:form_class] ||= 'f-container'
      self.options = options
      @html = ''
      @with_custom_button = false
      @footer = nil
      header(options[:form_id], options[:form_class])
    end
 
    def button(text, id, class_name)
      @with_custom_button = true
      @html << "\n<button type='submit' id=#{id} class=#{class_name}>#{text}</button>"
    end

    def header(id, class_name)
      @html << <<-HTML
      <form method='post' #{"action='javascript:void(0);' " if options[:url]}noValidate='noValidate' id="#{id}" class="#{class_name}">
      HTML
      self
    end
  end
end