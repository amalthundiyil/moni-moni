import os
from setuptools import setup, find_packages

with open("moni-moni/server/requirements.txt") as fp:
    required = fp.read().splitlines()

with open("moni-moni/server/requirements.txt") as fp:
    dev_required = fp.read().splitlines()

with open("README.md") as f:
    readme = f.read()

with open("LICENSE") as f:
    license = f.read()


setup(
    name="sauron",
    version="0.0.1",
    description="Open Source Software Security Inspector",
    long_description=readme,
    url="http://github.com/amal-thundiyil/sauron",
    author="Amal Thundiyil",
    author_email="amal.s.thundiyil@gmail.com",
    license=license,
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    install_requires=required,
    extras_require={
        "dev": dev_required,
    },
)
