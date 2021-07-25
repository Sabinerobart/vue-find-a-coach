# -*- mode: ruby -*-
# vi: set ft=ruby :
Vagrant.configure("2") do |config|
    # BEGIN VMWARE SPECIFIC CONFIG
    # vmware fusion specific configuration to deal with pci slot changing in future
  
    if Vagrant.has_plugin?("vagrant-vbguest")
      config.vbguest.auto_update = false
    end
  
    config.vm.define "vue-find-a-coach"
  
    config.vm.provider :vmare_desktop do |vmware|
      vmware.vmx["ethernet0.pcislotnumber"] = "33"
    end
    config.vm.provider "virtualbox" do |v|
      v.memory = 4096
      v.cpus = 2
    end
    # END VMWARE SPECIFIC CONFIG
    # use ubuntu 1604
    config.vm.box = "bento/ubuntu-20.04"
    # forward port 8000 which is used by vue
    config.vm.network "forwarded_port", guest: 8080, host: 8081
    config.vm.network "forwarded_port", guest: 9005, host: 9005
    # provision node and vue
    config.vm.provision "shell", path: "scripts/bootstrap-vagrant.sh"
  end
  
