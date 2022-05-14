
variable "project" {
  description = "AWS Project ID to use."
  type        = "string"
  default     = "moni-moni-342608"
}

variable "credentials_file" {
  description = "AWS Credentials path to use."
  type        = "string"
  default     = ""

 }

variable "profile" {
  description = "AWS Profile to use."
  type        = "string"
  default = ""
}

variable "region" {
  description = "AWS Region name"
  type        = "string"
  default     = "us-central"
}

variable "zone" {
  description = "AWS Zone name"
  type        = "string"
  default     = "us-central1"
}

variable "aws-ami-id" {
  description = "AWS AMI Id"
  type        = "string"
  default     = "ami-d874e0a0"
}

variable "instance-type" {
  description = "Instance type"
  type        = "string"
  default     = "t2.micro"
}
