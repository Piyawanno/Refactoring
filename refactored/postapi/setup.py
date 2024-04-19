#!/usr/bin/python3

import os, site, sys

class PostAPISetup:
	def __init__(self):
		self.getRootPath()
		self.getSitePackagePath()

	def operate(self, operation):
		if operation == 'link':
			self.link()
	
	def link(self):
		command = f'ln -s {self.rootPath}/postapi {self.sitePackagesPath}'
		print(command)
		os.system(command)

	def getRootPath(self):
		self.rootPath = os.path.dirname(os.path.abspath(__file__))
		return self.rootPath
	
	def getSitePackagePath(self):
		self.sitePackagesPath = ''
		for path in site.getsitepackages()[::-1]:
			if os.path.isdir(path): 
				self.sitePackagesPath = path
				break
		return self.sitePackagesPath

if __name__ == '__main__':
	setup = PostAPISetup()
	setup.operate(sys.argv[-1])