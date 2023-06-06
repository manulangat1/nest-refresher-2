terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}
provider "digitalocean" {
  token = var.token
}
variable "token" {
  type = string
}

output "token" {
  value = var.token
}


variable "key_fingerprint" {

  type = string

}

resource "digitalocean_droplet" "tf-learn" {
  image  = "ubuntu-22-10-x64"
  name   = "tf-learn"
  region = "FRA1"
  size   = "s-1vcpu-1gb"
  ssh_keys = [
    var.key_fingerprint

  ]




  # connection {
  #   type        = "ssh"
  #   host        = self.ipv4_address
  #   user        = "root"
  #   private_key = file("/home/manulangat/.ssh/id_rsa")
  #   agent       = false
  # }
  # provisioner "remote-exec" {
  #   inline = [
  #     "export ENV=dev",
  #     "mkdir test"
  #   ]
  # }
  tags = ["Name:development", "env:development", "created_by:emmanuel_langat"]

}


output "newly_created" {

  value = digitalocean_droplet.tf-learn.ipv4_address

}
